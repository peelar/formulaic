import { DragHandleHorizontalIcon } from "@radix-ui/react-icons";
import type { Identifier, XYCoord } from "dnd-core";
import type { PropsWithChildren } from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Button } from "../@/components/ui/button";

type DraggableProps = {
  id: any;
  index: number;
  moveFn: (dragIndex: number, hoverIndex: number) => void;
};

type DragItem = {
  index: number;
  id: string;
  type: string;
};

export const Draggable = ({
  id,
  children,
  index,
  moveFn,
}: PropsWithChildren<DraggableProps>) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "DRAGGABLE",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveFn(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "DRAGGABLE",
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;
  drag(drop(ref));

  return (
    <div className="flex gap-2 h-12 items-center" style={{ opacity }}>
      <Button
        type="button"
        variant={"secondary"}
        size={"icon"}
        data-handler-id={handlerId}
        ref={ref}
        className="w-10 h-full"
      >
        <DragHandleHorizontalIcon />
      </Button>
      {children}
    </div>
  );
};
