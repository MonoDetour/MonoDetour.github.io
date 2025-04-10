---
title: MonoDetourManager
description: Learn about the MonoDetourManager in MonoDetour.
sidebar:
  order: 3
---

Every hook made with MonoDetour is attached to a `MonoDetour.MonoDetourManager` object.
When no `MonoDetourManager` object is specified, MonoDetour will use the default `MonoDetour.HookGen.DefaultMonoDetourManager.Instance` it has generated for your assembly. You can use that manager for managing your hooks, or you can create your own managers.

```cs
// Apply all hooks marked with [MonoDetourHook<T>]
// which are in types that are marked with [MonoDetourTargets<T>]
DefaultMonoDetourManager.Instance.HookAll();

// Undo all applied hooks.
DefaultMonoDetourManager.Instance.UndoHooks();

// Cleans up, undoes and gets rid of all hooks.
// Use this is you never want to see these hooks again.
DefaultMonoDetourManager.Instance.DisposeHooks();

// Get the hook list from this MonoDetourManager.
List<ILHook> ilHooks = DefaultMonoDetourManager.Instance.ILHooks;
```
