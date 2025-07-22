---
title: MonoDetourManager
description: Learn about the MonoDetourManager in MonoDetour.
sidebar:
  order: 4
---

Every hook made with MonoDetour is attached to a `MonoDetour.MonoDetourManager` object.
When no `MonoDetourManager` object is specified, MonoDetour will use the default `MonoDetour.HookGen.DefaultMonoDetourManager.Instance` it has generated for your assembly. You can use that manager for managing your hooks, or you can create your own managers.

```cs
// Invoke hook initializers for this assembly
// which are in types that are marked with [MonoDetourTargets]
MonoDetourManager.InvokeHookInitializers(Assembly.GetExecutingAssembly());

// Applies all hooks belonging to this manager.
// Note: By default, a MonoDetourManager won't have any hooks.
// You need to initialize the hooks first, either calling them manually or using
// MonoDetourManager.InvokeHookInitializers(Assembly) or any of its overloads.
DefaultMonoDetourManager.Instance.ApplyHooks();

// Undoes all applied hooks belonging to this manager.
DefaultMonoDetourManager.Instance.UndoHooks();

// Cleans up, undoes and gets rid of all hooks belonging to this manager.
// Use this is you never want to see those hooks again.
DefaultMonoDetourManager.Instance.DisposeHooks();

// Get the hook list from this MonoDetourManager.
List<ILHook> ilHooks = DefaultMonoDetourManager.Instance.ILHooks;
```
