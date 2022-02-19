//users array for all users informations.
var users = []
var liarray = []
var removedusers = []
var idcount=0;
var sendcount=0;
var products=[]
var productcount=0;
var cart=[]


var removeinformation;

// add function for add new users.
var add = function (){
    // getting new username, balance informations.
    const addusername = document.getElementById("inputusername").value
    const addbalance = document.getElementById("inputbalance").value
    const newid = users.length+1
    const spacecontrol = addusername.split(" ");
    const balancecontrol = addbalance.split(" ");
    // space control on new username.
    if (spacecontrol.includes("")) {
        //if there is some spaces in username input, information writing on history panel.
        let lihistory = document.createElement('li');
        lihistory.setAttribute("class","warning")
        lihistory.textContent = "Invalid username.";
        const usershistorylist = document.querySelector('#usershistory');
        usershistorylist.appendChild(lihistory);
    }
    else {
        //space control on new balance input.
        if (balancecontrol.includes("")) {
            //if there is some spaces in balance input, information writing on history panel.
            let lihistory = document.createElement('li');
            lihistory.setAttribute("class","warning")
            lihistory.textContent = "Invalid balance.";
            const usershistorylist = document.querySelector('#usershistory');
            usershistorylist.appendChild(lihistory);
        }
        else {
            // balance input only can be a number.
            if (isNaN(addbalance)) {
                //if balance is not a number, information writing on history panel.
                let lihistory = document.createElement('li');
                lihistory.setAttribute("class","warning")
                lihistory.textContent = addbalance+" is not a number.";
                const usershistorylist = document.querySelector('#usershistory');
                usershistorylist.appendChild(lihistory);
                
            }
            else {
                let control = 0;
                // control all users for equal usernames.
                
                let firstcontrol = 0;
                let secondcontrol = 0;


                for (var i=0; i< users.length; i++) {
                    //we must check all users for equal username.
                    
                    if ((users[i].name).toUpperCase() === (addusername).toUpperCase()) {
                        // if there is equal username, information writing on history panel.
                        let lihistory = document.createElement('li');
                        lihistory.setAttribute("class","warning")
                        lihistory.textContent = addusername+' user is already exist.';
                        const usershistorylist = document.querySelector('#usershistory');
                        usershistorylist.appendChild(lihistory);
                        firstcontrol = 1;
                    }   
                    
                    
                }
                for (var i=0; i< removedusers.length; i++) {
                    // if there is equal username, information writing on history panel.
                    if ((removedusers[i].name).toUpperCase() === (addusername).toUpperCase()) {
                        let lihistory = document.createElement('li');
                        lihistory.setAttribute("class","warning")
                        control=1;
                        lihistory.textContent = addusername+' user is already exist but deleted. Please check history.';
                        const usershistorylist = document.querySelector('#usershistory');
                        usershistorylist.appendChild(lihistory);
                        secondcontrol = 1;
                    }
                    

                }
                // for create control number.
                if (firstcontrol === 0){
                    if (secondcontrol === 0) {
                        control = 0;
                    }
                    else {
                        control = 1;
                    }
                }
                else {
                    control = 1;
                }

                // if every control is true, new user will added.
                if (control===0){
                    console.log("control degeri= "+control)
                    // adding new user on users array.
                    idcount++
                    users.push({
                        name:addusername,
                        balance:Number(addbalance),
                        id:idcount
                    })
                    
                    const controlprocess = 0;
                    //adding new user name and new user balance on users panel.
                    let li = document.createElement('li');
                    li.setAttribute("id", idcount);
                    li.setAttribute("class", addusername);
                    const usernamelength = 50-addusername.length
                    const userslist = document.querySelector('#userslist');
                    userslist.appendChild(li);

                    let licontent = document.createElement('p');
                    licontent.setAttribute("id", idcount+"content");
                    licontent.textContent = (addusername+" "+addbalance+'₺');
                    li.appendChild(licontent)

                    let cancelbutton = document.createElement('img');
                    cancelbutton.setAttribute("id",idcount);
                    cancelbutton.setAttribute("class","cancel");
                    cancelbutton.setAttribute("src","cancel.png");
                    cancelbutton.setAttribute("alt","cancel");
                    cancelbutton.setAttribute("onclick","removeUser(id)");
                    licontent.appendChild(cancelbutton)

                    liarray.push(newid)

                    //adding new history 'li' with user name and user balance.
                    let lihistory = document.createElement('li');
                    lihistory.setAttribute("class","adduser")
                    lihistory.textContent = addusername+' user added with '+addbalance+'₺';
                    const usershistorylist = document.querySelector('#usershistory');
                    usershistorylist.appendChild(lihistory);

                    //adding new section on sender list.
                    let senderoption = document.createElement('option');
                    senderoption.setAttribute("id",idcount+"option")
                    senderoption.textContent = addusername;
                    const optionlist = document.querySelector('#senderlist');
                    optionlist.appendChild(senderoption);
            
                    //adding new section on reveiver list.
                    let receiveroption = document.createElement('option');
                    receiveroption.setAttribute("id",idcount+"receiveroption")
                    receiveroption.textContent = addusername;
                    const receiveroptionlist = document.querySelector('#receiverlist');
                    receiveroptionlist.appendChild(receiveroption);
                    console.log(users,removedusers)
                    //adding new section on owner list.
                    let cartowneroption = document.createElement('option');
                    cartowneroption.setAttribute("id",idcount+"cartowneroption")
                    cartowneroption.textContent = addusername;
                    const cartowneroptionlist = document.querySelector('#sepetsahibi');
                    cartowneroptionlist.appendChild(cartowneroption);



                    /*
                    const kontroletme = document.getElementsByTagName('ul')[0];
                    const kontroletme2 = kontroletme.getElementsByTagName('li')[0];
                    const kontroletme3 = kontroletme2.id
                    console.log(kontroletme3)*/

                }
            }
        }
    }
}

//send function for transfer money from one user to another one.
var send = function () {
    const sender =  document.getElementById("senderlist").value
    const receiver = document.getElementById("receiverlist").value
    const amount =  document.getElementById("inputamount").value
    const amountcontrol = amount.split(" ");
    let senderid=0;
    let receiverid=0;
    //if there is some spaces in amount, write information on history.
    if (amountcontrol.includes("")) {
        let lihistory = document.createElement('li');
        lihistory.setAttribute("class","warning")
        lihistory.textContent = "Invalid amount.";
        const usershistorylist = document.querySelector('#usershistory');
        usershistorylist.appendChild(lihistory);
    }
    else {
        if (isNaN(amount)) {
            // amount input only can be a number.
            let lihistory = document.createElement('li');
            lihistory.setAttribute("class","warning")
            lihistory.textContent = amount+" is not a number.";
            const usershistorylist = document.querySelector('#usershistory');
            usershistorylist.appendChild(lihistory);
        }
        else {
            //sender must be differrent receiver.
            if (sender===receiver){
                let lihistory = document.createElement('li');
                lihistory.setAttribute("class","warning")
                lihistory.textContent = "You can not send money to same account.";
                const usershistorylist = document.querySelector('#usershistory');
                usershistorylist.appendChild(lihistory);
            }
            else {
                //getting sender and receiver balances.
                let senderbalance = 0;
                let receiverbalance = 0;
                let senderindex = 0;
                let receiverindex = 0;
                // finding sender id.
                for (var i=0; i< idcount; i++) {
                    try {
                        if (users[i].name === sender) {
                            senderbalance = users[i].balance;
                            senderindex = i
                        }
                    }
                    catch {
                        console.log("173index icerisi hata")
                    } 
                
                }
                //finding receiver id.
                try {
                    for (var z=0; z< idcount; z++) {
                        if (users[z].name=== receiver) {
                            receiverbalance= users[z].balance;
                            receiverindex = z
                
                        }
                    }
                }
                catch {
                    console.log("188index icerisi hata")
                }
                //amount and balance check. Sender balance must be higher than amount.
                if (Number(amount)<=Number(senderbalance)) {
                    users[senderindex].balance=Number(senderbalance)-Number(amount)
                    users[receiverindex].balance=Number(receiverbalance)+Number(amount)

                    senderid = users[senderindex].id;
                    receiverid = users[receiverindex].id;
                    console.log(users)
                    
                    //check li id for change innerHTML.
                    const liid = String(senderindex+1)
                    const liidtwo = String(receiverindex+1)

                    let cancelbutton = document.createElement('img');
                    cancelbutton.setAttribute("id",users[senderindex].id);
                    cancelbutton.setAttribute("class","cancel");
                    cancelbutton.setAttribute("src","cancel.png");
                    cancelbutton.setAttribute("alt","cancel");
                    cancelbutton.setAttribute("onclick","removeUser(id)");

                    let cancelbutton2 = document.createElement('img');
                    cancelbutton2.setAttribute("id",users[receiverindex].id);
                    cancelbutton2.setAttribute("class","cancel");
                    cancelbutton2.setAttribute("src","cancel.png");
                    cancelbutton2.setAttribute("alt","cancel");
                    cancelbutton2.setAttribute("onclick","removeUser(id)");

                    //const targetli = document.getElementById(liid)
                    document.getElementById(senderid+"content").innerHTML = sender+" "+users[senderindex].balance+'₺'
                    document.getElementById(receiverid+"content").innerHTML = receiver+" "+users[receiverindex].balance+'₺'
                    
                    licontent = document.getElementById(senderid+"content");
                    licontent.appendChild(cancelbutton);

                    licontent = document.getElementById(receiverid+"content");
                    licontent.appendChild(cancelbutton2);

                    sendcount++

                    //new histoy 'li' for changes.
                    let lihistory = document.createElement('li');
                    lihistory.setAttribute("class","sendmoney")
                    lihistory.setAttribute("id",sendcount+"send")
                    lihistory.textContent = sender+' sent '+amount+'₺ to '+receiver;
                    const usershistorylist = document.querySelector('#usershistory');
                    usershistorylist.appendChild(lihistory);
                    
                    let returnbutton = document.createElement('img');
                    returnbutton.setAttribute("id",sendcount);
                    returnbutton.setAttribute("name",sender+"&"+amount+"&"+receiver);
                    returnbutton.setAttribute("class","cancel");
                    returnbutton.setAttribute("src","return.png");
                    returnbutton.setAttribute("alt","cancel");
                    returnbutton.setAttribute("onclick","returnTransfer(name,id)")
                    lihistory.appendChild(returnbutton)

                
                }
                else {
                    // if balance is not enough for transfer, writing information on history.
                    let lihistory = document.createElement('li');
                    lihistory.setAttribute("class","warning")
                    lihistory.textContent = sender+"'s balance is not enough for transfer.";
                    const usershistorylist = document.querySelector('#usershistory');
                    usershistorylist.appendChild(lihistory);
                }
            }
        }
    }
}

var findremoveindex = function () {
    var lilength = document.getElementsByTagName('ul')[0];
    var lilength2 = lilength.getElementsByTagName('li');
    var lilength3 = lilength2.length;
    for (p=0; p<lilength3; p++) {
        liarray.push(lilength2[p].id)
        console.log(liarray)
    }


}

var removeUser = function (id) {
    const elem = document.getElementById(id);
    const removedusername = elem.getElementsByTagName('p')[0].outerText;
    const splitremovedusername = removedusername.split(" ");
    const srul = splitremovedusername.length-1;
    const forbalance = splitremovedusername[srul].split("₺")[0];
    const justname = splitremovedusername.splice(splitremovedusername[srul].split("₺"))
    justname.splice(-1,1)
    const joinname = justname.join(" ");

    removedusers.push({
        name: joinname,
        balance: forbalance,
        id:Number(id)
    })
    for (v=0; v<idcount; v++){
        try {
            if (users[v].id===Number(id)){
                users.splice(v,1)
            }
        }
        catch {
            //pass
        }
    }

    var removesender = document.getElementById(id+"option");
    removesender.parentElement.removeChild(removesender);

    var removereceiver = document.getElementById(id+"receiveroption");
    removereceiver.parentElement.removeChild(removereceiver);

    var removeowner = document.getElementById(id+"cartowneroption");
    removeowner.parentElement.removeChild(removeowner);


    elem.parentElement.removeChild(elem);

    let lihistory = document.createElement('li');
    lihistory.setAttribute("class","userdeleted")
    lihistory.setAttribute("id",id+"deleted")
    lihistory.textContent = justname[0]+" user deleted.";
    const usershistorylist = document.querySelector('#usershistory');
    usershistorylist.appendChild(lihistory);

    let returnbutton = document.createElement('img');
    returnbutton.setAttribute("id",id);
    returnbutton.setAttribute("class","cancel");
    returnbutton.setAttribute("onclick","returnUser(id)");
    returnbutton.setAttribute("src","return.png");
    returnbutton.setAttribute("alt","cancel");
    lihistory.appendChild(returnbutton)
}

var returnUser = function (id) {
    for (k=0; k<idcount; k++){
        try{
            if (removedusers[k].id===Number(id)){
                console.log("Arrayden aktarılacak index= "+k)
                users.push({
                    name: removedusers[k].name,
                    balance: Number(removedusers[k].balance),
                    id:Number(id)
                })
                let li = document.createElement('li');
                li.setAttribute("id", Number(id));
                li.setAttribute("class", removedusers[k].name);
                const userslist = document.querySelector('#userslist');
                userslist.appendChild(li);
                            
                let licontent = document.createElement('p');
                licontent.setAttribute("id", Number(id)+"content");
                licontent.textContent = (removedusers[k].name+" "+removedusers[k].balance+'₺');
                li.appendChild(licontent)
                            
                let cancelbutton = document.createElement('img');
                cancelbutton.setAttribute("id",Number(id));
                cancelbutton.setAttribute("class","cancel");
                cancelbutton.setAttribute("src","cancel.png");
                cancelbutton.setAttribute("alt","cancel");
                cancelbutton.setAttribute("onclick","removeUser(id)");
                licontent.appendChild(cancelbutton)

                //adding new section on sender list.
                let senderoption = document.createElement('option');
                senderoption.setAttribute("id",id+"option")
                senderoption.textContent = removedusers[k].name;
                const optionlist = document.querySelector('#senderlist');
                optionlist.appendChild(senderoption);
        
                //adding new section on reveiver list.
                let receiveroption = document.createElement('option');
                receiveroption.setAttribute("id",id+"receiveroption")
                receiveroption.textContent = removedusers[k].name;
                const receiveroptionlist = document.querySelector('#receiverlist');
                receiveroptionlist.appendChild(receiveroption);
                console.log(users,removedusers)
                
                //adding new section on owner list.
                let cartowneroption = document.createElement('option');
                cartowneroption.setAttribute("id",id+"cartowneroption")
                cartowneroption.textContent = removedusers[k].name;
                const cartowneroptionlist = document.querySelector('#sepetsahibi');
                cartowneroptionlist.appendChild(cartowneroption);




                const elem = document.getElementById(id+"deleted");
                elem.parentElement.removeChild(elem);

                removedusers.splice(k,1)
            }
        }
        catch {
            //pass
        }
    }

}
// for return transfers.
var returnTransfer = function (name,id) {
    console.log(name)
    const namearray = name.split("&");
    const senderinfo = namearray[0]
    const receiverinfo = namearray[2]
    const amountinfo = namearray[1]
    console.log("Gönderici="+senderinfo+" Alıcı="+receiverinfo+" Tutar="+amountinfo)
    let usercontrol1 = 1;
    let usercontrol2= 1;
    let senderbalancert=0;
    let senderidrt=0;
    let senderindexrt=0;
    let receiverbalancert=0;
    let receiveridrt=0;
    let receiverindexrt=0;
    for (var i=0; i< idcount; i++) {
        try {
            if (users[i].name === senderinfo) {
                senderbalancert = users[i].balance;
                senderidrt = users[i].id;
                senderindexrt = i

                usercontrol1 = 1;
            }
        }
        catch {
            console.log("173index icerisi hata")
        } 
    
    }
    //finding receiver id.
    try {
        for (var z=0; z< idcount; z++) {
            if (users[z].name=== receiverinfo) {
                receiverbalancert= users[z].balance;
                receiveridrt = users[z].id;
                receiverindexrt = z
                usercontrol2=1;
    
            }
        }
    }
    catch {
        console.log("188index icerisi hata")
    }
    let situationcontrol=0;
    let situationcontrol2=0;
    try {
        for ( y=0; y< idcount; y++){

            if (users[y].name===senderinfo) {
                situationcontrol=1;
            }
            else 
            {
                //pass
            }
        }
    }
    catch {
        console.log("index502 hata")
    }
    try {
        for ( n=0; n< idcount; n++){

            if (users[n].name===receiverinfo) {
                situationcontrol2=1;
            }
            else 
            {
                //pass
            }
        }
    }
    catch {
        console.log("index517 hata")
    }
    if (situationcontrol*situationcontrol2 === 1) {
        if (usercontrol1*usercontrol2===1){
            users[senderindexrt].balance = users[senderindexrt].balance+Number(amountinfo);
    
            users[receiverindexrt].balance = users[receiverindexrt].balance-Number(amountinfo);

            document.getElementById(senderidrt+"content").innerHTML = senderinfo+" "+users[senderindexrt].balance+'₺'
            document.getElementById(receiveridrt+"content").innerHTML = receiverinfo+" "+users[receiverindexrt].balance+'₺'
            console.log(users)
    
            let cancelbutton10 = document.createElement('img');
            cancelbutton10.setAttribute("id",users[senderindexrt].id);
            cancelbutton10.setAttribute("class","cancel");
            cancelbutton10.setAttribute("src","cancel.png");
            cancelbutton10.setAttribute("alt","cancel");
            cancelbutton10.setAttribute("onclick","removeUser(id)");
    
            let cancelbutton210 = document.createElement('img');
            cancelbutton210.setAttribute("id",users[receiverindexrt].id);
            cancelbutton210.setAttribute("class","cancel");
            cancelbutton210.setAttribute("src","cancel.png");
            cancelbutton210.setAttribute("alt","cancel");
            cancelbutton210.setAttribute("onclick","removeUser(id)");
    
            licontent10 = document.getElementById(users[senderindexrt].id+"content");
            licontent10.appendChild(cancelbutton10);
    
            licontent10 = document.getElementById(users[receiverindexrt].id+"content");
            licontent10.appendChild(cancelbutton210);
    


            const elem = document.getElementById(id+"send");
            elem.parentElement.removeChild(elem);
            
    
        }
        else {
            console.log("There is no users.")
        }
    }
    else {
        let lihistory10 = document.createElement('li');
        lihistory10.setAttribute("class","warning")
        lihistory10.textContent = "User or users not found. Please check history.";
        const usershistorylist10 = document.querySelector('#usershistory');
        usershistorylist10.appendChild(lihistory10);



        console.log("Users not found.")
    }


}
//for filter all history elements.
var filterby = function () {
    console.log("buton calisti")
    //filterby all
    if (document.getElementById("filterlist").value==="All") {
        console.log(document.getElementById("filterlist").value)

        for (m=0; m<document.getElementsByClassName("sendmoney").length; m++) {
            document.getElementsByClassName("sendmoney")[m].removeAttribute("hidden")
        }

        for (u=0; u<document.getElementsByClassName("adduser").length; u++) {
            document.getElementsByClassName("adduser")[u].removeAttribute("hidden")
        }
        for (p=0; p<document.getElementsByClassName("warning").length; p++) {
            document.getElementsByClassName("warning")[p].removeAttribute("hidden")
        }
        for (k=0; k<document.getElementsByClassName("userdeleted").length; k++) {
            document.getElementsByClassName("userdeleted")[k].removeAttribute("hidden")
        }
        for (o=0; o<document.getElementsByClassName("sold").length; o++) {
            document.getElementsByClassName("sold")[o].removeAttribute("hidden")
        }


    }
    //filter by transfers.
    else if (document.getElementById("filterlist").value==="Transfers") {
        for (m=0; m<document.getElementsByClassName("sendmoney").length; m++) {
            document.getElementsByClassName("sendmoney")[m].removeAttribute("hidden")
        }
        for (u=0; u<document.getElementsByClassName("adduser").length; u++) {
            document.getElementsByClassName("adduser")[u].setAttribute("hidden",true)
        }
        for (p=0; p<document.getElementsByClassName("warning").length; p++) {
            document.getElementsByClassName("warning")[p].setAttribute("hidden",true)
        }
        for (k=0; k<document.getElementsByClassName("userdeleted").length; k++) {
            document.getElementsByClassName("userdeleted")[k].setAttribute("hidden",true)
        }
        for (o=0; o<document.getElementsByClassName("sold").length; o++) {
            document.getElementsByClassName("sold")[o].setAttribute("hidden",true)
        }

    }
    //filter by deleted users.
    else if (document.getElementById("filterlist").value==="Deleted Users") {
        for (m=0; m<document.getElementsByClassName("sendmoney").length; m++) {
            document.getElementsByClassName("sendmoney")[m].setAttribute("hidden",true)
        }

        for (u=0; u<document.getElementsByClassName("adduser").length; u++) {
            document.getElementsByClassName("adduser")[u].setAttribute("hidden",true)
        }
        for (p=0; p<document.getElementsByClassName("warning").length; p++) {
            document.getElementsByClassName("warning")[p].setAttribute("hidden",true)
        }
        for (k=0; k<document.getElementsByClassName("userdeleted").length; k++) {
            document.getElementsByClassName("userdeleted")[k].removeAttribute("hidden")
        }
        for (o=0; o<document.getElementsByClassName("sold").length; o++) {
            document.getElementsByClassName("sold")[o].setAttribute("hidden",true)
        }

    }
    //filter by added users.
    else if (document.getElementById("filterlist").value==="Added Users") {
        for (m=0; m<document.getElementsByClassName("sendmoney").length; m++) {
            document.getElementsByClassName("sendmoney")[m].setAttribute("hidden",true)
        }
        for (u=0; u<document.getElementsByClassName("adduser").length; u++) {
            document.getElementsByClassName("adduser")[u].removeAttribute("hidden")
        }
        for (p=0; p<document.getElementsByClassName("warning").length; p++) {
            document.getElementsByClassName("warning")[p].setAttribute("hidden",true)
        }
        for (k=0; k<document.getElementsByClassName("userdeleted").length; k++) {
            document.getElementsByClassName("userdeleted")[k].setAttribute("hidden",true)
        }
        for (o=0; o<document.getElementsByClassName("sold").length; o++) {
            document.getElementsByClassName("sold")[o].setAttribute("hidden",true)
        }

    }
    //filter by warnings.
    else if (document.getElementById("filterlist").value==="Warnings") {
        for (m=0; m<document.getElementsByClassName("sendmoney").length; m++) {
            document.getElementsByClassName("sendmoney")[m].setAttribute("hidden",true)
        }
        for (u=0; u<document.getElementsByClassName("adduser").length; u++) {
            document.getElementsByClassName("adduser")[u].setAttribute("hidden",true)
        }
        for (p=0; p<document.getElementsByClassName("warning").length; p++) {
            document.getElementsByClassName("warning")[p].removeAttribute("hidden")
        }
        for (k=0; k<document.getElementsByClassName("userdeleted").length; k++) {
            document.getElementsByClassName("userdeleted")[k].setAttribute("hidden",true)
        }
        for (o=0; o<document.getElementsByClassName("sold").length; o++) {
            document.getElementsByClassName("sold")[o].setAttribute("hidden",true)
        }

    }
    //filter by sold.
    else if (document.getElementById("filterlist").value==="Sold") {
        for (m=0; m<document.getElementsByClassName("sendmoney").length; m++) {
            document.getElementsByClassName("sendmoney")[m].setAttribute("hidden",true)
        }
        for (u=0; u<document.getElementsByClassName("adduser").length; u++) {
            document.getElementsByClassName("adduser")[u].setAttribute("hidden",true)
        }
        for (p=0; p<document.getElementsByClassName("warning").length; p++) {
            document.getElementsByClassName("warning")[p].setAttribute("hidden",true)
        }
        for (k=0; k<document.getElementsByClassName("userdeleted").length; k++) {
            document.getElementsByClassName("userdeleted")[k].setAttribute("hidden",true)
        }
        for (o=0; o<document.getElementsByClassName("sold").length; o++) {
            document.getElementsByClassName("warning")[p].removeAttribute("hidden")
        }

    }

}
// for adding new products.
var addProduct = function () {
    const pm = document.getElementById("inputproduct").value
    const aos =  Number(document.getElementById("stockamount").value)
    const pr = Number(document.getElementById("inputprice").value)
    productcount++
    products.push({
        productname: pm,
        amountofstock: aos,
        price: pr,
        id: productcount
    })

    let producthistory = document.createElement('li');
    producthistory.setAttribute("id",productcount+"product");
    producthistory.setAttribute("class",pm);
    const addproducthistory = document.querySelector('#producthistory');
    addproducthistory.appendChild(producthistory);

    let licontent = document.createElement('p');
    licontent.setAttribute("id", productcount+"product");
    licontent.textContent = "Product: "+pm+" Piece: "+aos+" Unit Price :"+pr+"₺";
    producthistory.appendChild(licontent)


    let addcartbutton = document.createElement('img');
    addcartbutton.setAttribute("id",productcount);
    addcartbutton.setAttribute("name",pm+"&"+aos+"&"+pr+"&"+productcount);
    addcartbutton.setAttribute("class","cancel");
    addcartbutton.setAttribute("src","addchart.png");
    addcartbutton.setAttribute("alt","cancel");
    addcartbutton.setAttribute("onclick","addtoCart(name)")
    licontent.appendChild(addcartbutton)



}
// for adding new items in cart.
var addtoCart = function (name) {
    const getproduct = name.split("&");
    cart.push({
        productname:getproduct[0],
        amountofstock:Number(getproduct[1]),
        price: Number(getproduct[2]),
        id: Number(getproduct[3])
    })
    let productindex=0;
    for (c=0; c< products.length; c++) {
        if (products[c].id===Number(getproduct[3])) {
            productindex=c;
            products.splice(c,1)
            const elem = document.getElementById(getproduct[3]+"product");
            elem.parentElement.removeChild(elem);

            let producthistory = document.createElement('li');
            producthistory.setAttribute("id",getproduct[3]+"product");
            producthistory.setAttribute("class",getproduct[0]);
            const addproducthistory = document.querySelector('#carthistory');
            addproducthistory.appendChild(producthistory);
        
            let licontent = document.createElement('p');
            licontent.setAttribute("id", getproduct[3]+"product");
            licontent.textContent = "Product: "+getproduct[0]+" Piece: "+getproduct[1]+" Unit Price :"+getproduct[2]+"₺";
            producthistory.appendChild(licontent)
        
        
            let addcartbutton = document.createElement('img');
            addcartbutton.setAttribute("id",getproduct[3]);
            addcartbutton.setAttribute("name",getproduct[0]+"&"+getproduct[1]+"&"+getproduct[2]+"&"+getproduct[3]);
            addcartbutton.setAttribute("class","cancel");
            addcartbutton.setAttribute("src","cancel.png");
            addcartbutton.setAttribute("alt","cancel");
            addcartbutton.setAttribute("onclick","removeCart(name)")
            licontent.appendChild(addcartbutton)

            let total = 0;

            for (b=0; b<cart.length; b++) {
                let calculate = cart[b].price*cart[b].amountofstock
                total = total+calculate;
            }

            const elem2 = document.querySelector('#cartamount');
            elem2.parentElement.removeChild(elem2);
            
            
            const newamountspan = document.createElement('span');
            newamountspan.setAttribute("class","input-group-text");
            newamountspan.setAttribute("id","cartamount");
            newamountspan.setAttribute("style","color: orange; background-color: black;");
            newamountspan.textContent= "Total: "+total+"₺";

            const changeamount = document.querySelector('#sepettekilerbottom');
            changeamount.appendChild(newamountspan);

        
        }

    }
}
// for remove items from cart.
var removeCart = function (name) {
    console.log(name)
    const getproduct = name.split("&");
    products.push({
        productname:getproduct[0],
        amountofstock:Number(getproduct[1]),
        price: Number(getproduct[2]),
        id: Number(getproduct[3])
    })
    let productindex=0;
    for (c=0; c< cart.length; c++) {
        if (cart[c].id===Number(getproduct[3])) {
            productindex=c;
            cart.splice(c,1)

            const elem = document.getElementById(getproduct[3]+"product");
            elem.parentElement.removeChild(elem);

            let producthistory = document.createElement('li');
            producthistory.setAttribute("id",getproduct[3]+"product");
            producthistory.setAttribute("class",getproduct[0]);
            const addproducthistory = document.querySelector('#producthistory');
            addproducthistory.appendChild(producthistory);
        
            let licontent = document.createElement('p');
            licontent.setAttribute("id", getproduct[3]+"product");
            licontent.textContent = "Product: "+getproduct[0]+" Piece: "+getproduct[1]+" Unit Price :"+getproduct[2]+"₺";
            producthistory.appendChild(licontent)
        
        
            let addcartbutton = document.createElement('img');
            addcartbutton.setAttribute("id",getproduct[3]);
            addcartbutton.setAttribute("name",getproduct[0]+"&"+getproduct[1]+"&"+getproduct[2]+"&"+getproduct[3]);
            addcartbutton.setAttribute("class","cancel");
            addcartbutton.setAttribute("src","addchart.png");
            addcartbutton.setAttribute("alt","cancel");
            addcartbutton.setAttribute("onclick","addtoCart(name)")
            licontent.appendChild(addcartbutton)
        
            let total = 0;

            for (b=0; b<cart.length; b++) {
                let calculate = cart[b].price*cart[b].amountofstock
                total = total+calculate;
            }

            const elem2 = document.querySelector('#cartamount');
            elem2.parentElement.removeChild(elem2);
            
            
            const newamountspan = document.createElement('span');
            newamountspan.setAttribute("class","input-group-text");
            newamountspan.setAttribute("id","cartamount");
            newamountspan.setAttribute("style","color: orange; background-color: black;");
            newamountspan.textContent= "Total: "+total+"₺";

            const changeamount = document.querySelector('#sepettekilerbottom');
            changeamount.appendChild(newamountspan);

        }
    }
}
// for sell some items to cart owners.
var sell = function (name) {
    const cartowner = document.getElementById("sepetsahibi").value
    let total = 0;

    for (b=0; b<cart.length; b++) {
        let calculate = cart[b].price*cart[b].amountofstock
        total = total+calculate;
    }
    total = Number(total)

    for (n=0; n<users.length; n++) {
        if (users[n].name===cartowner) {
            if (users[n].balance>=total){
                users[n].balance = users[n].balance-total
                document.getElementById(users[n].id+"content").innerHTML = users[n].name+" "+users[n].balance+'₺'
                
                let cancelbutton = document.createElement('img');
                cancelbutton.setAttribute("id",users[n].id);
                cancelbutton.setAttribute("class","cancel");
                cancelbutton.setAttribute("src","cancel.png");
                cancelbutton.setAttribute("alt","cancel");
                cancelbutton.setAttribute("onclick","removeUser(id)");

                let licontent = document.getElementById(users[n].id+"content");
                licontent.appendChild(cancelbutton);

                for (f=0; f< cart.length; f++) {
                    const elem = document.getElementById(cart[f].id+"product");
                    elem.parentElement.removeChild(elem); 
                    
      
                }
                total=0;

                const elem2 = document.querySelector('#cartamount');
                elem2.parentElement.removeChild(elem2);
    

                const newamountspan = document.createElement('span');
                newamountspan.setAttribute("class","input-group-text");
                newamountspan.setAttribute("id","cartamount");
                newamountspan.setAttribute("style","color: orange; background-color: black;");
                newamountspan.textContent= "Total: "+total+"₺";
    
                const changeamount = document.querySelector('#sepettekilerbottom');
                changeamount.appendChild(newamountspan);
    
                let lihistory = document.createElement('li');
                lihistory.setAttribute("class","sold")
                lihistory.textContent = "Products in cart list just sold.";
                const usershistorylist = document.querySelector('#usershistory');
                usershistorylist.appendChild(lihistory);

                cart.splice(0,cart.length)
            }
            else {
                let lihistory = document.createElement('li');
                lihistory.setAttribute("class","warning")
                lihistory.textContent = "Cart Owner's balance is not enough for trade.";
                const usershistorylist = document.querySelector('#usershistory');
                usershistorylist.appendChild(lihistory);
            }
        
        }
    }
}

