---
title: HookGen
description: Learn about MonoDetour's HookGen!
sidebar:
  order: 5
---

MonoDetour borrows MonoMod's HookGen v2 which works with C# source generators which generates hook helpers right in your assembly, meaning your assembly won't depend on external assemblies for hook helpers. MonoDetour makes minor modifications to MonoMod's HookGen v2 to make it fit MonoDetour's vision.

## Generating Hooks

You need to tell MonoDetour's HookGen which types to generate hooks for to keep the size of the generated code smaller.

:::note
If the size of generated hooks appears to become an issue, an IL post-processing step could be implemented by MonoDetour to strip away unused hooks. Currently it is not a priority.
:::

We can tell MonoDetour which types to generate hooks for:

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
internal static class SomeMethod
{
    public delegate void PrefixSignature(global::Namespace.SomeType self,
        ref int number);

    public delegate void PostfixSignature(global::Namespace.SomeType self,
        ref int number,
        ref bool returnValue);

    public static global::MonoMod.RuntimeDetour.ILHook Prefix(PrefixSignature hook,
        global::MonoDetour.MonoDetourManager? manager = null
    ) => (manager ?? global::MonoDetour.HookGen.DefaultMonoDetourManager.Instance)
            .Hook(Target(), hook.Method,
                new(global::MonoDetour.DetourTypes.DetourType.PrefixDetour));

    public static global::MonoMod.RuntimeDetour.ILHook Postfix(PostfixSignature hook,
        global::MonoDetour.MonoDetourManager? manager = null
    ) => (manager ?? global::MonoDetour.HookGen.DefaultMonoDetourManager.Instance)
            .Hook(Target(), hook.Method,
                new(global::MonoDetour.DetourTypes.DetourType.PostfixDetour));

    public static global::MonoMod.RuntimeDetour.ILHook ILHook(global::MonoMod.Cil.ILContext.Manipulator manipulator,
        global::MonoDetour.MonoDetourManager? manager = null
    ) => (manager ?? global::MonoDetour.HookGen.DefaultMonoDetourManager.Instance)
            .Hook(Target(), manipulator);

    public static global::System.Reflection.MethodBase Target()
    {
        var type = typeof(global::Namespace.SomeType);
        var method = type.GetMethod("SomeMethod", (global::System.Reflection.BindingFlags)~0, null, [
            typeof(int),
        ], null);
        if (method is null) ThrowHelper.ThrowMissingMethod("Namespace.SomeType", "SomeMethod");
        return method;
    }
}
```
