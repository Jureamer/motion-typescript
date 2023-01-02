"use strict";
let ul = document.querySelector('.block_ul');
let div = document.createElement('div');
let button = document.querySelector('button');
let inputTitle = document.querySelector('.popup_input_title');
let inputUrl = document.querySelector('.popup_input_url');
let inputBody = document.querySelector('.popup_input_body');
let inputTitleData = "";
let inputUrlData = "";
let inputBodyData = "";
inputTitle === null || inputTitle === void 0 ? void 0 : inputTitle.addEventListener('change', (e) => {
    e.preventDefault();
    if (e.target) {
        inputTitleData = e.target.value;
    }
    console.log(`inputTitleData: ${inputTitleData}`);
});
inputUrl === null || inputUrl === void 0 ? void 0 : inputUrl.addEventListener('change', (e) => {
    e.preventDefault();
    if (e.target) {
        inputUrlData = e.target.value;
    }
    console.log(`inputUrlData: ${inputUrlData}`);
});
inputBody === null || inputBody === void 0 ? void 0 : inputBody.addEventListener('change', (e) => {
    e.preventDefault();
    if (e.target) {
        inputBodyData = e.target.value;
    }
    console.log(`inputBodyData: ${inputBodyData}`);
});
// button?.addEventListener('click', () => {
//     let title = "";
//     let url = "";
//     let body = "";       
//     switch (type) {
//         case 'video':
//             blockMaker.addVideo()
//         case 'picture':
//             blockMaker.addPicture()
//         case 'note':
//             blockMaker.addNote()
//         case 'todo':
//             blockMaker.addTodo()
//         default:
//             throw new Error("Unknown type!!")
//     }
// })
