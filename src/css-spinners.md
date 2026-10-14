### spokes

```tsx
<div className=" scale-100 animate-spin  w-20 h-20 relative">
  <div className="border-3 border-black w-5 rounded-full absolute top-1/2 -left-2.5"></div>
  <div className="border-3 border-black w-5 rounded-full absolute top-7/8 -rotate-45  left-[calc(100%/8-10px)]"></div>
  <div className="border-3 border-black w-5 rounded-full absolute top-full left-[calc(100%/2-10px)] -rotate-90"></div>
  <div className="border-3 border-black w-5 rounded-full absolute top-1/8 left-[calc(100%/8-10px)] rotate-45"></div>
  <div className="border-3 border-black w-5 rounded-full absolute  left-[calc(100%/2-10px)] rotate-90"></div>
  <div className="border-3 border-black w-5 rounded-full absolute top-1/8 left-[calc(87.5%-10px)] rotate-135"></div>
  <div className="border-3 border-black w-5 rounded-full absolute top-1/2 left-[calc(100%-10px)]"></div>
  <div className="border-3 border-black w-5 rounded-full absolute top-7/8 left-[calc(87.5%-10px)] -rotate-135"></div>
</div>
```

### classic

```tsx
<div className=" scale-100 animate-spin  w-20 h-20 relative">
  <div className="border-3 border-slate-400 w-5 rounded-full absolute top-1/2 -left-2.5 animate-[borderPulse_1s_ease-in-out_infinite]"></div>
  <div className="border-3 border-slate-400 w-5 rounded-full absolute top-1/8 left-[calc(100%/8-10px)] rotate-45 animate-[borderPulse_1s_ease-in-out_infinite] [animation-delay:0.125s]"></div>
  <div className="border-3 border-slate-400 w-5 rounded-full absolute  left-[calc(100%/2-10px)] rotate-90 animate-[borderPulse_1s_ease-in-out_infinite] [animation-delay:0.25s]"></div>
  <div className="border-3 border-slate-400 w-5 rounded-full absolute top-1/8 left-[calc(87.5%-10px)] rotate-135 animate-[borderPulse_1s_ease-in-out_infinite] [animation-delay:0.375s]"></div>
  <div className="border-3 border-slate-400 w-5 rounded-full absolute top-1/2 left-[calc(100%-10px)] animate-[borderPulse_1s_ease-in-out_infinite] [animation-delay:0.5s]"></div>
  <div className="border-3 border-slate-400 w-5 rounded-full absolute top-7/8 left-[calc(87.5%-10px)] -rotate-135 animate-[borderPulse_1s_ease-in-out_infinite] [animation-delay:0.625s]"></div>
  <div className="border-3 border-slate-400 w-5 rounded-full absolute top-full left-[calc(100%/2-10px)] -rotate-90 animate-[borderPulse_1s_ease-in-out_infinite] [animation-delay:0.75s]"></div>
  <div className="border-3 border-slate-400 w-5 rounded-full absolute top-7/8 -rotate-45  left-[calc(100%/8-10px)] animate-[borderPulse_1s_ease-in-out_infinite] [animation-delay:0.875s]"></div>
</div>
```

### pulsing dots

```tsx
<div className=" scale-50   w-20 h-20 relative">
  <div className="border-3 border-slate-400 w-5 h-5 bg-slate-400 rounded-full absolute top-1/2 -left-2.5 animate-[dotPulse_1s_ease-in-out_infinite]"></div>
  <div className="border-3 border-slate-400 w-5 h-5 bg-slate-400 rounded-full absolute top-1/8 left-[calc(100%/8-10px)] rotate-45 animate-[dotPulse_1s_ease-in-out_infinite] [animation-delay:0.125s]"></div>
  <div className="border-3 border-slate-400 w-5 h-5 bg-slate-400 rounded-full absolute  left-[calc(100%/2-10px)] rotate-90 animate-[dotPulse_1s_ease-in-out_infinite] [animation-delay:0.25s]"></div>
  <div className="border-3 border-slate-400 w-5 h-5 bg-slate-400 rounded-full absolute top-1/8 left-[calc(87.5%-10px)] rotate-135 animate-[dotPulse_1s_ease-in-out_infinite] [animation-delay:0.375s]"></div>
  <div className="border-3 border-slate-400 w-5 h-5 bg-slate-400 rounded-full absolute top-1/2 left-[calc(100%-10px)] animate-[dotPulse_1s_ease-in-out_infinite] [animation-delay:0.5s]"></div>
  <div className="border-3 border-slate-400 w-5 h-5 bg-slate-400 rounded-full absolute top-7/8 left-[calc(87.5%-10px)] -rotate-135 animate-[dotPulse_1s_ease-in-out_infinite] [animation-delay:0.625s]"></div>
  <div className="border-3 border-slate-400 w-5 h-5 bg-slate-400 rounded-full absolute top-full left-[calc(100%/2-10px)] -rotate-90 animate-[dotPulse_1s_ease-in-out_infinite] [animation-delay:0.75s]"></div>
  <div className="border-3 border-slate-400 w-5 h-5 bg-slate-400 rounded-full absolute top-7/8 -rotate-45  left-[calc(100%/8-10px)] animate-[dotPulse_1s_ease-in-out_infinite] [animation-delay:0.875s]"></div>
</div>
```

### spiral

```tsx
<div className=" scale-50   w-20 h-20 relative">
  <div className="border-3 border-slate-400 w-5 h-5 bg-slate-400 rounded-full absolute top-1/2 -left-2.5 animate-[spiral_1s_ease-in-out_infinite]"></div>
  <div className="border-3 border-slate-400 w-5 h-5 bg-slate-400 rounded-full absolute top-1/8 left-[calc(100%/8-10px)] rotate-45 animate-[spiral_1s_ease-in-out_infinite] [animation-delay:0.125s]"></div>
  <div className="border-3 border-slate-400 w-5 h-5 bg-slate-400 rounded-full absolute  left-[calc(100%/2-10px)] rotate-90 animate-[spiral_1s_ease-in-out_infinite] [animation-delay:0.25s]"></div>
  <div className="border-3 border-slate-400 w-5 h-5 bg-slate-400 rounded-full absolute top-1/8 left-[calc(87.5%-10px)] rotate-135 animate-[spiral_1s_ease-in-out_infinite] [animation-delay:0.375s]"></div>
  <div className="border-3 border-slate-400 w-5 h-5 bg-slate-400 rounded-full absolute top-1/2 left-[calc(100%-10px)] animate-[spiral_1s_ease-in-out_infinite] [animation-delay:0.5s]"></div>
  <div className="border-3 border-slate-400 w-5 h-5 bg-slate-400 rounded-full absolute top-7/8 left-[calc(87.5%-10px)] -rotate-135 animate-[spiral_1s_ease-in-out_infinite] [animation-delay:0.625s]"></div>
  <div className="border-3 border-slate-400 w-5 h-5 bg-slate-400 rounded-full absolute top-full left-[calc(100%/2-10px)] -rotate-90 animate-[spiral_1s_ease-in-out_infinite] [animation-delay:0.75s]"></div>
  <div className="border-3 border-slate-400 w-5 h-5 bg-slate-400 rounded-full absolute top-7/8 -rotate-45  left-[calc(100%/8-10px)] animate-[spiral_1s_ease-in-out_infinite] [animation-delay:0.875s]"></div>
</div>
```
