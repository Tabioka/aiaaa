import { createClient } from "@liveblocks/client";
import { getYjsProviderForRoom } from "@liveblocks/yjs";
import * as Y from "yjs";
import { yCollab } from "y-codemirror.next";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";

// Set up Liveblocks client
const client = createClient({
  publicApiKey: "pk_dev_SydZQGauot53-1jn0H9m-L3csSzevTS9uSIKepMUI1iMYjpNN9CKDsDZ31vAWk8H",
});

// Enter a multiplayer room
const { room, leave } = client.enterRoom("my-room");

// Set up Yjs document, shared text, and Liveblocks Yjs provider
const yProvider = getYjsProviderForRoom(room);
const yDoc = yProvider.getYDoc()
const yText = yDoc.getText("codemirror");

// Set up CodeMirror and extensions
const state = EditorState.create({
  doc: yText.toString(),
  extensions: [
    basicSetup,
    javascript(),
    yCollab(ytext, yProvider.awareness, { undoManager }),
  ],
});

// Attach CodeMirror to element
const parent = document.querySelector("#editor");
view = new EditorView({
  state,
  parent,
});
