import { IContext } from "overmind";
import { createStateHook, createActionsHook } from "overmind-react";

import { state } from "./state";
import * as effects from "./effects";
import * as actions from "./actions";

export const config = { state, effects, actions };

export type Context = IContext<typeof config>;

export const useAppState = createStateHook<Context>();
export const useActions = createActionsHook<Context>();
