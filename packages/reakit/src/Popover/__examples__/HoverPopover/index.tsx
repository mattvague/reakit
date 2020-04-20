import * as React from "react";
import { Button } from "reakit/Button";
import {
  usePopoverState,
  Popover,
  PopoverDisclosure,
  PopoverArrow,
  PopoverInitialState,
} from "reakit/Popover";
import { Separator } from "reakit/Separator";

function useHoverPopoverState(initialState?: PopoverInitialState) {
  let timeout: number;
  const popover = usePopoverState(initialState);
  function show() {
    if (timeout) window.clearTimeout(timeout);
    popover.show();
  }
  function hide() {
    if (timeout) window.clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      popover.hide();
    }, 300);
  }
  return {
    ...popover,
    onMouseEnter: show,
    onMouseLeave: hide,
  };
}

type User = {
  fullname: string;
  username: string;
  description: string;
};

const user: User = {
  fullname: "John Doe",
  username: "@JohnDoe",
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat,
              tortor vestibulum tempus hendrerit, velit est pellentesque massa,
              vulputate mollis diam nulla et felis. Donec molestie molestie tellus.`,
};

export default function HoverPopover() {
  const popover = useHoverPopoverState();
  return (
    <>
      <PopoverDisclosure
        {...popover}
        as="a"
        href="#"
        aria-label={`See ${user.username}'s profile`}
      >
        {user.username}
      </PopoverDisclosure>
      <Popover
        {...popover}
        aria-label={`Preview of ${user.fullname}'s profile`}
      >
        <PopoverArrow {...popover} />
        <header>
          {user.fullname} <small>({user.username})</small>
        </header>
        <p>{user.description}</p>
        <Separator />
        <Button>follow</Button>
      </Popover>
    </>
  );
}