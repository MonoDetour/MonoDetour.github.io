---
title: Hooking Normal Methods
description: Learn from Hook examples with MonoDetour!
sidebar:
  order: 0
---

To start hooking, we need a target method we want to hook. So, given the target type and method we want to hook:

```cs
namespace Lib;

public class LibraryClass
{
    public bool IsTrue { get; set; }

    // We want to hook this.
    public int TakeAndReturnInt(int number)
    {
        return number;
    }

    public void PrintFoo()
    {
        Console.WriteLine("Foo");
    }
}
```

Let's generate hooks for the type:

```cs
// Tell MonoDetour's HookGen to generate hooks
// for the target type.
[MonoDetourTargets<LibraryClass>]
// Or use [MonoDetourTargets(typeof(LibraryClass))]
// if the target type is static.
public class LibraryMethodsHooks
{
    // ...
}
```

## Basic Hook

Now we can get to hooking. A simple hook we can do is:

```cs
[MonoDetourTargets<LibraryClass>]
public class LibraryMethodsHooks
{
    [MonoDetourHookInit]
    static void Init()
    {
        // Add a prefix hook which runs at the start of the target method.
        On.Lib.LibraryClass.TakeAndReturnInt.Prefix(Prefix_LibraryMethods_TakeAndReturnInt);
    }

    static void Prefix_LibraryMethods_TakeAndReturnInt(ref TakeAndReturnInt.Params args)
    {
        // As soon as LibraryClass.TakeAndReturnInt runs,
        // call its method PrintFoo with its instance.
        args.self.PrintFoo();

        // Increment the 'number' parameter by one.
        args.number_1 += 1;

        // Note that MonoDetour.HookGen adds the index
        // of the target parameter to the parameter name.
        // This is done to prevent name conflicts.
    }
}
```

We can also add a hook that runs at the end of a method:

```cs
// Add a postfix hook which runs at the end of the target method.
On.Lib.LibraryClass.TakeAndReturnInt.Postfix(Postfix_LibraryMethods_TakeAndReturnInt);
// ...
static void Postfix_LibraryMethods_TakeAndReturnInt(ref TakeAndReturnInt.Params args)
{
    Console.WriteLine("Hello from postfix hook!");
}
```

## Changing Return Value

TODO: Currently not possible.

## Hooking Properties

MonoDetour.HookGen also generates hooks for properties, so this is the same case as with the basic hook example.
One thing to know though is that getter methods have a `get_` prefix, and setter methods have a `set_` prefix.

```cs
// Hook the getter method:
On.Lib.LibraryClass.get_IsTrue.Prefix(MyHook);

// Hook the setter method:
On.Lib.LibraryClass.set_IsTrue.Prefix(MyHook);
// Note that if the property doesn't implement
// a setter, there won't be a hook for it.
```
