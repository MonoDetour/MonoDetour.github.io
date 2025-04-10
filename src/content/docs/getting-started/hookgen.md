---
title: HookGen
description: Learn about MonoDetour's HookGen!
sidebar:
  order: 4
---

First, you need to tell MonoDetour which types to generate hooks for:

```cs
[assembly: MonoDetourTargets<SomeType>]
// or
[assembly: MonoDetourTargets(typeof(SomeType))]
// or
[MonoDetourTargets<SomeType>]
static class TargetTypeHooks { }
// or
[MonoDetourTargets(typeof(SomeType))]
static class TargetTypeHooks { }
```

Then, MonoDetour's HookGen generates hooks like this:

```cs
On.SomeNamespace.SomeType.SomeMethod.Prefix(YourPrefixHookHere);
On.SomeNamespace.SomeType.SomeMethod.Postfix(YourPostfixHookHere);
On.SomeNamespace.SomeType.SomeMethod.ILHook(YourILHookHere);
```

Behind the scenes, the generated hooks look something like this:

```cs
internal static class SomeMethod
{
    [global::System.ComponentModel.EditorBrowsable(global::System.ComponentModel.EditorBrowsableState.Never)]
    public delegate void MethodParams(ref Params args);

    public ref struct Params
    {
        public global::SomeNamespace.SomeType self;
    }

    public static global::MonoMod.RuntimeDetour.ILHook Prefix(
        MethodParams args,
        global::MonoDetour.MonoDetourManager? manager = null
    ) => (manager ?? global::MonoDetour.HookGen.HookGenManager.Instance)
            .HookGenReflectedHook(args, new(global::MonoDetour.DetourType.PrefixDetour));

    public static global::MonoMod.RuntimeDetour.ILHook Postfix(
        MethodParams args,
        global::MonoDetour.MonoDetourManager? manager = null
    ) => (manager ?? global::MonoDetour.HookGen.HookGenManager.Instance)
            .HookGenReflectedHook(args, new(global::MonoDetour.DetourType.PostfixDetour));

    public static global::MonoMod.RuntimeDetour.ILHook ILHook(
        global::MonoMod.Cil.ILContext.Manipulator manipulator,
        global::MonoDetour.MonoDetourManager? manager = null
    ) => (manager ?? global::MonoDetour.HookGen.HookGenManager.Instance)
            .Hook(Target(), manipulator);

    public static global::System.Reflection.MethodBase Target()
    {
        var type = typeof(global::SomeNamespace.SomeType);
        var method = type.GetMethod("SomeMethod", (global::System.Reflection.BindingFlags)~0, null, [
        ], null);
        if (method is null) ThrowHelper.ThrowMissingMethod("SomeNamespace.SomeType", "SomeMethod");
        return method;
    }
}
```

When a Hook method has a single parameter like the `Params` struct which exists in a type which also has a `public static global::System.Reflection.MethodBase Target()` method that returns the target method, `MonoDetourManager.HookGenReflectedHook` can gather all the information required for the hook and applies it.
