---
title: HookGen
description: Learn about MonoDetour's HookGen!
sidebar:
  order: 5
---

MonoDetour borrows MonoMod's HookGen v2 which works with C# source generators which generates hook helpers right in your assembly, meaning your assembly won't depend on external assemblies for hook helpers. MonoDetour makes minor modifications to MonoMod's HookGen v2 to make it fit MonoDetour's vision.

## Generating Hooks

The first thing you need to do is tell MonoDetour's HookGen which types to generate hooks for.

:::tip
Even though these hook helpers are generated in your assembly, unused hooks will be mostly stripped out during `Release` configuration builds by default to keep your assembly size small.
:::

We can tell MonoDetour which types to generate hooks for by using this attribute:

```cs
[assembly: MonoDetourTargets(typeof(SomeType))]
// or
[MonoDetourTargets(typeof(SomeType))]
static class SomeTypeHooks { }
```

Then, MonoDetour's HookGen generates hooks like this:

```cs
On.SomeNamespace.SomeType.SomeMethod.Prefix(YourPrefixHookHere);
On.SomeNamespace.SomeType.SomeMethod.Postfix(YourPostfixHookHere);
On.SomeNamespace.SomeType.SomeMethod.ILHook(YourILHookHere);
```

## Behind The Scenes

The hooks MonoDetour generates look something like this:

```cs
internal static partial class SomeMethod
{
    public delegate void PrefixSignature(global::SomeType self);
    public delegate void PostfixSignature(global::SomeType self);

    public static global::MonoDetour.MonoDetourHook Prefix(PrefixSignature hook, global::MonoDetour.MonoDetourConfig? config = null, bool applyByDefault = true, global::MonoDetour.MonoDetourManager? manager = null) =>
        (manager ?? global::MonoDetour.HookGen.DefaultMonoDetourManager.Instance)
            .Hook<PrefixDetour>(Target(), hook.Method, config, applyByDefault);

    public static global::MonoDetour.MonoDetourHook Postfix(PostfixSignature hook, global::MonoDetour.MonoDetourConfig? config = null, bool applyByDefault = true, global::MonoDetour.MonoDetourManager? manager = null) =>
        (manager ?? global::MonoDetour.HookGen.DefaultMonoDetourManager.Instance)
            .Hook<PostfixDetour>(Target(), hook.Method, config, applyByDefault);

    public static global::MonoDetour.MonoDetourHook ILHook(global::MonoDetour.Cil.ILManipulationInfo.Manipulator manipulator, global::MonoDetour.MonoDetourConfig? config = null, bool applyByDefault = true, global::MonoDetour.MonoDetourManager? manager = null) =>
        (manager ?? global::MonoDetour.HookGen.DefaultMonoDetourManager.Instance)
            .ILHook(Target(), manipulator, config, applyByDefault);

    public static global::System.Reflection.MethodBase Target()
    {
        var type = typeof(global::SomeType);
        var method = type.GetMethod("SomeMethod", (global::System.Reflection.BindingFlags)~0, null, [
        ], null);
        if (method is null) throw new global::System.MissingMethodException("SomeType", "SomeMethod");
        return method;
    }
}
```
