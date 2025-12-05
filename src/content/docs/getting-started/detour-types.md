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

MonoDetour also supports custom detour types with types that implement `IMonoDetourHookApplier`:

```cs
/// <summary>
/// A type which implements this interface can be used as a
/// detour type, meaning the type can be passed in as a generic parameter
/// to <see cref="MonoDetourHook"/> construction methods such as
/// <see cref="MonoDetourManager.Hook{TApplier}(System.Reflection.MethodBase, System.Delegate, MonoDetour.MonoDetourConfig?, bool)"/>.<br/>
/// <br/>
/// MonoDetour uses this to implement <see cref="PrefixDetour"/>,
/// <see cref="PostfixDetour"/> and <see cref="ILHookDetour"/>.
/// If none of the available detour types satisfy your needs,
/// you can implement your own. See any of the implemented detour types for reference.
/// </summary>
/// <remarks>
/// For MonoDetour to be able to use a type which implements this
/// interface, the type must have a parameterless constructor.
/// </remarks>
public interface IMonoDetourHookApplier
{
    /// <summary>
    /// All the available metadata for the MonoDetour Hook.
    /// </summary>
    IReadOnlyMonoDetourHook Hook { get; set; }

    /// <summary>
    /// The <see cref="ILContext.Manipulator"/> method that is called
    /// when the ILHook is applied.
    /// </summary>
    /// <param name="il">The <see cref="ILContext"/> passed for manipulating the target method.</param>
    void ApplierManipulator(ILContext il);
}
```

In fact, this is how MonoDetour implements its detour types.
