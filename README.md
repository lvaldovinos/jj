# Practical examples using vanilla javascript and web apis

This code is experimental, state-manager follows [redux](https://redux.js.org/) concepts, will create a mobx like just for fun in the future. I think Redux is really simple, and IMHO that's what makes Redux so impresive.

## Goals

* Use latest ES6 features without requiring any bundle
* No JS dependencies in the client side
* Use native WEB APIs
* Hopefully with this small practices, I can get more insigth on current state of the web.
* Use typescript in the server side

# Projects

1. Counter (this won't be a real experiment, if a counter isn't built)
2. Geolocation (Show in a map where current device is, or provide an address)
3. Chat (create one room, and whoever has access to local url, would join it)
4. Video chat (no messages, only video)

## Start locally

```bash
deno --allow-net --allow-read server.ts
```

## Conclusions so far

1. ES6 support in Chrome >80 is really nice! I haven't needed any bundler so far.
2. [Web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) rules! It's been pretty straigthforward to create new components, and it's nice you can import css files and apply classes to elements within a shadow element of a web component, without affecting other web components, so that encapsulation is impressive.
3. This excersice opened my eyes, and I used to take for granted that it's super easy to import any state manager, or any other tool which makes you forget about basic stuff of any application, so I respect more all developers who contribute to OSS, whatever the library, big/small all authors/contributors of OSS rock!.
