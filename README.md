# OSI Journey

I created this interactive visualization to help people understand what happens when you type a URL in your browser, the entire journey - from the electrons flowing through your keyboard to the complex dance of DNS resolution and content delivery.

## What Does It Show?

The visualization breaks down the journey into three key aspects:
- OSI Model Layers: See how your request moves through each layer of the networking stack
- Journey Steps: Watch the progression from physical input to server response
- Detailed Steps: Dive deep into each stage, including special cases like different TLD handling and Cloudflare CDN integration

Just start typing a web address, and watch how:
- Your keypress generates electrical signals
- The browser processes your input
- DNS resolves the domain (with special handling for .gov, .edu, etc.)
- Cloudflare CDN handles the request
- The origin server finally responds

I hope this helps demystify what's happening under the hood of every web request you make!
