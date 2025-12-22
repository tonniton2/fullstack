sequenceDiagram
    participant browser
    participant server
        
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: json file
    deactivate server

    Note right of browser: The browser creates the note, adds it to the notelist, redraws the notelist and sends the new note to the server
