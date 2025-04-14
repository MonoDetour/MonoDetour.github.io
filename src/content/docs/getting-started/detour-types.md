---
title: Detour Types
description: Learn about detour types with MonoDetour.
sidebar:
  order: 3
---

MonoDetour has 3 built-in detour types. These are:

- **PrefixDetour**: A hook which runs at the start of a method
- **PostfixDetour**: A hook which runs at the end of a method
- **ILHookDetour**: A regular MonoMod `ILHook`, capable of modifying methods on the CIL level

MonoDetour also supports custom detour types with types that implement `IMonoDetourHookEmitter`:

```cs
public interface IMonoDetourHookEmitter
{
    /// <summary>
    /// All the available metadata for the MonoDetour Hook.
    /// </summary>
    MonoDetourInfo Info { get; set; }

    /// <summary>
    /// The <see cref="ILContext.Manipulator"/> method that is called
    /// when the ILHook is applied.
    /// </summary>
    /// <param name="il">The <see cref="ILContext"/> passed for manipulating the target method.</param>
    void Manipulator(ILContext il);
}
```

In fact, this is how MonoDetour implements its detour types. while the `DetourType` enum is not extensible, that enum maps to MonoDetour's implementation classes for those detour types.
