---
title: Introduction
description: Get started with using MonoDetour for your .NET detouring needs!
sidebar:
  order: 2
---

In MonoDetour, target method parameters are passed in as a struct, making it easy to discover what's possible.

You can use generated hooks directly for hooking like with MonoMod's HookGen:

```cs
internal static void InitHooks()
{
    // Note: this is using the default generated MonoDetourManager
    // MonoDetour.HookGen.DefaultMonoDetourManager.Instance by default.
    // Use it for managing your hooks.
    On.SomeNamespace.SomeType.SomeMethod.Prefix(Prefix_SomeType_SomeMethod);
}

static void Prefix_SomeType_SomeMethod(
    ref On.SomeNamespace.SomeType.SomeMethod.Params args)
{
    Console.WriteLine("Hello from Prefix hook 1!");
}
```

Or you can do things the Harmony way:

```cs
using MonoDetour;
using MonoDetour.HookGen;

// Tell MonoDetourManager to look for MonoDetourHook methods in this type.
// Also tells HookGen to generate hooks for the specified type.
[MonoDetourTargets<SomeType>]
class SomeTypeHooks
{
    internal static void InitHooks()
    {
        // HookAll using the generated MonoDetourManager instance for this assembly.
        DefaultMonoDetourManager.Instance.HookAll();
    }

    // Via enum. Maps to MonoDetour.PrefixDetour as seen in next hook.
    [MonoDetourHook(DetourType.PrefixDetour)]
    static void Prefix2_SomeType_SomeMethod(
        ref On.SomeNamespace.SomeType.SomeMethod.Params args)
    {
        Console.WriteLine("Hello from Prefix hook 2!");
    }

    // Via class that implements MonoDetour.IMonoDetourHookEmitter
    [MonoDetourHook<PrefixDetour>]
    static void Prefix3_SomeType_SomeMethod(
        ref On.SomeNamespace.SomeType.SomeMethod.Params args)
    {
        Console.WriteLine("Hello from Prefix hook 3!");
    }
}
```

MonoDetour entirely relies on `ILHook`s for hooking similar to HarmonyX. But instead of having monolithic `ILHook` methods like in HarmonyX, MonoDetour maps every hook to a unique `ILHook`.
