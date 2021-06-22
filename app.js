import { ChatHandler, chat_names } from './ChatHandler.js';

onload = function () {

    // For the unordered list.
    const chatlist = document.getElementById('chat-list');
    // For the button added to generate any random operation.
    const add = document.getElementById('generate-step');
    // For updating the operations list about the type of operation performed.
    const text = document.getElementById('temptext');

    // Here template refers to the html template which we implemented in index.html
    const templates = document.getElementsByTagName('template')[0];
    // present inside the template.
    const chat_item = templates.content.querySelector("li");

    // parameters passed to the chathandler are template and the actual chatlist.
    const chatHandler = new ChatHandler(chat_item, chatlist);
    // This will hold the id of all the people having a message in the chat list at the moment.
    let chats = [];

    add.onclick = function () {
        // when Math.random() is greater than 0.75 and chats list is not empty.
        if(Math.random()>0.75 && chats.length > 0){
            // deleting any chat in the chatlist randomly.
            let index = Math.floor(Math.random()*chats.length);
            let idToDelete = chats[index];
            // calling the delete function. chats[index] gives the id of the chat to be deleted.
            chatHandler.deleteMsg(idToDelete);
            // updating the operations list.
            // splice function is used to add/remove elements from the array.
            text.innerHTML = "Deleted message from "+chat_names[idToDelete] + "<br>" + text.innerHTML;
                chats.splice(index, 1);
        }  // when Math.random() is less than or equal to 0.75. 
        else{
            // generating any random id to add message to the list.
            let idOfMsg = Math.floor(Math.random()*7);
            if(chats.includes(idOfMsg)===false){
                // if not present in the chats array. this is actually acting like a hashmap in lru cache by
                // keeping the note of the data recently called.
                chats.push(idOfMsg);
            }
             // calling the new message function. idOfMsg tells which person is to be added to the chats list.
            chatHandler.newMsg(idOfMsg);
            // updating the operations list.
            text.innerHTML = "New message from "+chat_names[idOfMsg] + "<br>" + text.innerHTML;
        }
    };
};