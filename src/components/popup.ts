
    type Nullable<T> = T | null;
    let ul = document.querySelector('.block_ul');
    let div = document.createElement('div');
    let button = document.querySelector('button');
    let inputTitle = document.querySelector('.popup_input_title');
    let inputUrl = document.querySelector('.popup_input_url');
    let inputBody = document.querySelector('.popup_input_body');
    let inputTitleData: Nullable<string> = ""
    let inputUrlData: Nullable<string> = ""
    let inputBodyData: Nullable<string> = ""

    inputTitle?.addEventListener('change', (e: Event): void => {
        e.preventDefault();
        if (e.target) {
            inputTitleData = e.target.value;
        }

        console.log(`inputTitleData: ${inputTitleData}`)
    })

    inputUrl?.addEventListener('change', (e): void => {
        e.preventDefault();
        if (e.target) {
            inputUrlData = e.target.value;
        }
        console.log(`inputUrlData: ${inputUrlData}`)
    })

    inputBody?.addEventListener('change', (e): void => {
        e.preventDefault();
        if (e.target) {
            inputBodyData = e.target.value;
        }
        console.log(`inputBodyData: ${inputBodyData}`)
    })

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
