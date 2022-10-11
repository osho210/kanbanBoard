import React from "react";
import styled from "styled-components";
import * as color from './color'
import { Button, DangerButton } from "./Button";

export function DeleteDialog({
    onConfirm,
    onCancel,
    className,
}:{
    onConfirm?():void
})