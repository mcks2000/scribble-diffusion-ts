import React, { useRef, useEffect } from "react";
import { ReactSketchCanvas, type CanvasPath, type ReactSketchCanvasRef } from "react-sketch-canvas";
import { Undo as UndoIcon, Trash as TrashIcon } from "lucide-react";


export default function Canvas({
  startingPaths,
  setScribble,
  scribbleExists,
  setScribbleExists,
}: {
  startingPaths: CanvasPath[],
  setScribble: (data: string) => void,
  scribbleExists: boolean,
  setScribbleExists: (data: boolean) => void
}) {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);


  useEffect(() => {
    // Hack to work around Firfox bug in react-sketch-canvas
    // https://github.com/vinothpandian/react-sketch-canvas/issues/54
    document
      .querySelector("#react-sketch-canvas__stroke-group-0")
      ?.removeAttribute("mask");

    loadStartingPaths();
  }, []);


  async function loadStartingPaths() {
    const canvas = canvasRef.current;
    if (canvas) {
      // 将画布元素类型转换为访问自定义方法
      await canvas.loadPaths(startingPaths);
      setScribbleExists(true);

      onChange();
    }
  }

  async function onChange() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const paths = await canvas.exportPaths();
    localStorage.setItem("paths", JSON.stringify(paths, null, 2));

    setScribbleExists(true);

    const data = await canvas.exportImage("png");
    setScribble(data);
  };

  const undo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.undo();
  };

  const reset = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setScribbleExists(false);
    canvas.resetCanvas();
  };

  return (
    <div className="relative">
      {scribbleExists || (
        <div>
          <div className="absolute grid w-full h-full p-3 place-items-center pointer-events-none text-xl">
            <span className="opacity-40">Draw something here.</span>
          </div>
        </div>
      )}

      <ReactSketchCanvas
        ref={canvasRef}
        className="w-full aspect-square border-none cursor-crosshair"
        strokeWidth={4}
        strokeColor="black"
        onChange={onChange}
        withTimestamp={true}
      />

      {scribbleExists && (
        <div className="animate-in fade-in duration-700 text-left">
          <button type="button" className="lil-button" onClick={undo}>
            <UndoIcon className="icon" />
            Undo
          </button>
          <button type="button" className="lil-button" onClick={reset}>
            <TrashIcon className="icon" />
            Clear
          </button>
        </div>
      )}
    </div>
  );
}


