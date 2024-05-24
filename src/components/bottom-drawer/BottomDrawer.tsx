/**
 * Copyright (c) 2024 Cisco Systems, Inc. and its affiliates
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http:www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Drawer, DrawerProps } from "antd";
import { FC, useCallback, useEffect, useState } from "react";
import styles from "./bottom-drawer.module.scss";

interface ResizableBottomDrawerProps extends DrawerProps {
  isDrawerVisible: boolean;
  setIsDrawerVisible: (value: ((prevState: boolean) => boolean) | boolean) => void;
}

let isResizing: any = null;

export const BottomDrawer: FC<ResizableBottomDrawerProps> = ({
  children,
  isDrawerVisible,
  setIsDrawerVisible,
  ...props
}) => {
  const [drawerHeight, setDrawerHeight] = useState<any>(undefined);

  const cbHandleMouseMove = useCallback(handleMousemove, []);
  const cbHandleMouseUp = useCallback(handleMouseup, []);

  useEffect(() => {
    setDrawerHeight(props.height);
  }, [isDrawerVisible]);

  function handleMouseup(e: any) {
    if (!isResizing) {
      return;
    }
    isResizing = false;
    document.removeEventListener("mousemove", cbHandleMouseMove);
    document.removeEventListener("mouseup", cbHandleMouseUp);
  }

  function handleMousedown(e: any) {
    e.stopPropagation();
    e.preventDefault();
    // we will only add listeners when needed, and remove them afterward
    document.addEventListener("mousemove", cbHandleMouseMove);
    document.addEventListener("mouseup", cbHandleMouseUp);
    isResizing = true;
  }

  function handleMousemove(e: any) {
    const offsetRight = document.body.offsetHeight - (e.clientY - document.body.offsetTop);
    const minHeight = 15;
    const maxHeight = 1000;
    if (offsetRight > minHeight && offsetRight < maxHeight) {
      setDrawerHeight(offsetRight);
    }
  }

  return (
    <>
      <Drawer
        className={styles.resizableBottomDrawerComponent}
        open={isDrawerVisible}
        height={drawerHeight}
        onClose={() => setIsDrawerVisible(false)}
        mask={false}
        placement="bottom"
        destroyOnClose
        {...props}
      >
        <div className={styles.dragHandle} onMouseDown={handleMousedown} />
        {children}
      </Drawer>
    </>
  );
};
