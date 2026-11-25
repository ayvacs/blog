---
layout: blog.njk
title: default tables in luau
date: 2026-06-01
tags:
    - post
---

```lua
local inventory = defaultTable(0)

inventory.coins += 50
inventory.gems += 5

print(inventory.coins)   -- 50
print(inventory.potions) -- 0
```

If you've spent any time writing Luau, you've almost certainly run into this runtime error:

`attempt to perform arithmetic (add) on nil and number`

In Luau (and other languages!), compound operators like `+=` and `-=` are great quality-of-life additions. But the moment you attempt to increment a value that <u>doesn't exist yet</u> in a table, the engine stops you right in your tracks.

Because accessing a non-existent key yields `nil`, every Luau codebase inevitably gets littered with wordy defensive guard clauses and fallback expressions that are a <u>nightmare</u> for readability:

```lua
-- The standard defensive check
if (not inventory.coins) then
    inventory.coins = 0
end
inventory.coins += 50

-- Or the slightly conciser inline equivalent:
inventory.coins = (inventory.coins or 0) + 50
```

While this does work as you expect it to, it's repetitive and adds unnecessary noise to your codebase. When you're managing nested structures—such as player session stats, inventory systems, or event counters—the ceremony compounds quickly:

```lua
if (not sessionData[player]) then
    sessionData[player] = {}
end
if (not sessionData[player][action]) then
    sessionData[player][action] = 0
end
sessionData[player][action] += 1
```

Coming from Python, one standard library tool I constantly find myself wishing was built into Lua is `collections.defaultdict`: a dictionary that automatically initialises missing keys with a default value on first access.

As it turns out, we can build the exact same behaviour in Luau with under 15 lines of code! no frameworks, no external dependencies, and zero magic.

### The Implementation

All we need to achieve this is Luau's `__index` metamethod and `rawset`:

```lua
local function defaultTable(default)
    local isCallable = type(default) == "function"

    return setmetatable({}, {
        __index = function(self, key)
            local value = if isCallable then default(key) else default
            rawset(self, key, value)
            return value
        end
    })
end
```

Let's break down what's happening here:

1. When an unpopulated key is indexed (e.g. `inventory.coins`), Luau checks its metatable for an `__index` handler.
2. If `default` is a function, we invoke it to generate a fresh value (crucial when defaults are reference types like tables). Otherwise, we simply use the static primitive that `default` must be.
3. `rawset`: We write the value directly into `self`. Because the key is now physically stored in the hash table, subsequent reads and writes will hit the table directly, bypassing `__index` entirely and running at native Luau hash lookup speed.

Because `inventory.coins += 50` is syntactic sugar for `inventory.coins = inventory.coins + 50`, Luau first *indexes* `coins` (which fires `__index`, inserts `0`, and returns `0`), and then adds `50` to it.

### Autovivification (Nested Tables)

Where this pattern truly shines is nested data structures (often called *autovivification*). By passing a constructor function as the default generator, we can nest default tables infinitely:

```lua
local playerStats = defaultTable(function()
    return defaultTable(0)
end)

playerStats["ayvacs"]["kills"] += 1
playerStats["ayvacs"]["score"] += 250

print(playerStats["ayvacs"]["kills"])  -- 1
print(playerStats["ayvacs"]["deaths"]) -- 0
```

There are no nested `if not ... then` guards in sight. Accessing `playerStats["ayvacs"]` immediately instantiates an inner `defaultTable(0)`, and indexing `["kills"]` on that table initialises its value to `0` right before the `+= 1` evaluates.

### Grouping and Buckets

The generator function also receives the indexed `key` as an argument, which makes grouping items into arrays or sub-collections effortless:

```lua
local itemsByType = defaultTable(function()
    return {}
end)

table.insert(itemsByType.weapons, "Iron Sword")
table.insert(itemsByType.weapons, "Crossbow")
table.insert(itemsByType.potions, "Health Elixir")

print(#itemsByType.weapons) -- 2
```

No need to check if `itemsByType.weapons` exists before calling `table.insert`. It initialises on demand with an empty table.

### Summary

Like the function call notations and closure-driven objects I've explored in earlier posts, **small, thoughtful abstractions in Luau can dramatically elevate developer ergonomics**. 

You don't need a heavy state library or complicated ORM to write clean, enjoyable code. With a simple 12-line helper, one of Luau's most common friction points disappears into a clean, intuitive API.
