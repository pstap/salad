'use strict';

let _state = null;

function init_state() {
    _state = {
        conn_status: false,
        socket: null,
        label: "IDLE",
    };
}

function get_state() {
    return _state;
}

document.addEventListener("DOMContentLoaded", function() {
    init_state();
    const conn_status_ui = document.getElementById("conn-status");

    const state = get_state();

    // Create WebSocket connection.
    state.socket  = new WebSocket('ws://localhost:8080/websocket');

    // Connection opened
    state.socket.addEventListener('open', function (event) {
        state.conn_status = true;
        conn_status_ui.innerHTML = conn_status_str(state.conn_status);
        console.log('Opened socket');
    });

    // Listen for messages
    state.socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
    });

    state.socket.addEventListener('close', function (event) {
        state.conn_status = false;
        conn_status_ui.innerHTML = conn_status_str(state.conn_status);
        console.log('Socket closed');
    });

});

function conn_status_str(status) {
    if(status) {
        return "Connected";
    } else {
        return "Disconnected";
    }
}

function state_status_str(state) {
    switch(state) {
    case "IDLE":
        return "Idle";
        break;
    case "WAITING":
        return "Waiting...";
        break;
    case "RECV":
        return "Got result";
        break;
    default:
        return "Unknown";
    }
}


function send() {
    const state = get_state();
    const sock = state.socket;
    const msg = document.getElementById("message").value;
    const req = {
        type: "SUBMIT",
        content: msg
    };
    sock.send(JSON.stringify(req));
}
