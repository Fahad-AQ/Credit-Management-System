  var getEmail = document.getElementById('getEmail');
    var getPwd = document.getElementById('getPass');
    var chkPwd = document.getElementById('CheckPass');
    var email = document.getElementById('email');
    var pwd = document.getElementById('pwd');
    var delUser=document.getElementById('delUser');
    document.getElementById("hideRow").style.visibility = "hidden";
    var users=[];
    function removeAll() {
        document.getElementById("userName").innerHTML    = "";
        document.getElementById("creditLimit").innerHTML   = "";
        document.getElementById("creditTotal").innerHTML = "";
        document.getElementById("no.").innerHTML = "";
    }
    function register() {
        if (+getPwd.value < +chkPwd.value){
            alert("Your Total credit is more than credit limit");
        }
        else if(getEmail.value !=="" && getPwd.value!==""){
            var matchFound = false;
            for(var i=0;i<users.length ;i++){
                if(getEmail.value.toLowerCase()===users[i].clientName.toLowerCase()) {
                    matchFound = true;
                    alert("Username Already Exists");
                    break;}
                if(getEmail.value.toLowerCase()===users[i].clientName.toLowerCase()) {
                    matchFound = true;
                    alert("Your Total credit is more than credit limit");
                    break;}
            }
            if(matchFound === false){
                localStorage.setItem("user",JSON.stringify({
                            usersname  : getEmail.value,
                            creditLimits: getPwd.value,
                            creditTotals: chkPwd.value
                        }
                ));
                test = JSON.parse((localStorage.getItem("user")));
                users.push(new Customer(test.usersname.slice(0,1).toUpperCase()+test.usersname.slice(1).toLowerCase(),+test.creditLimits,+test.creditTotals));
                document.getElementById("hideRow").style.visibility = "visible";
                removeAll();
                addAll();
            }

        }
        else {
            alert("Fill Out All Form");
        }}
    function addAll() {
        for(var i=0;i<users.length;i++){
            document.getElementById("userName").innerHTML += users[i].clientName+ "<br />" ;
            document.getElementById("creditLimit").innerHTML += users[i].creditLimit + "<br />" ;
            document.getElementById("creditTotal").innerHTML += users[i].totalCredit + "<br />" ;
            document.getElementById("no.").innerHTML += i+1 + "<br />" ;

        }
    }
    function del(){
        var matchFound = false;
        for(var i=0;i<users.length ;i++){
            if(delUser.value.toLowerCase()==users[i].clientName.toLowerCase()) {
                matchFound = true;
                users.splice(i,1);
                removeAll();
                addAll();
                break
            }}
        if(matchFound === false){
            alert("There are no user for this Name");
        }
    }
    function delAll(){
        for(var i=0;i<users.length ;i++){
            document.getElementById("hideRow").style.visibility = "hidden";
            users = [];
            removeAll();
        }
    }
    function debitAmount(){
        var matchFound = false;
        for(var i=0;i<users.length ;i++){
            if(email.value.toLowerCase()==users[i].clientName.toLowerCase()) {
                matchFound = true;
                alert(users[i].debit(+pwd.value));
                document.getElementById("hideRow").style.visibility = "visible";
                document.getElementById("creditTotal").innerHTML += users[i].totalCredit + "<br />" ;
                removeAll();
                addAll();
                break;
            }}
        if(matchFound === false){
            alert("You are no user here anymore")
        }
    }
    function creditAmount(){
        var matchFound = false;
        for(var i=0;i<users.length ;i++){
            if(email.value.toLowerCase()==users[i].clientName.toLowerCase()) {
                matchFound = true;
                alert(users[i].credit(+pwd.value));
                document.getElementById("hideRow").style.visibility = "visible";
                document.getElementById("creditTotal").innerHTML += users[i].totalCredit + "<br />" ;
                removeAll();
                addAll();
                break;
            }}
        if(matchFound === false){
            alert("You are no user here anymore")
        }
    }
    function Customer(clientName,creditLimit,totalCredit){
        this.creditLimit=creditLimit;
        this.clientName=clientName;
        this.totalCredit=totalCredit;
    }
    Customer.prototype.credit=function(val){
        if(val+this.totalCredit > this.creditLimit){
            return this.clientName+" we can't give you more Credit";
        }
        else{
            this.totalCredit+=val;
            return this.clientName+" Ok your Total Credit became "+this.totalCredit;
        }
    };
    Customer.prototype.debit=function(val){
        if(this.totalCredit == 0){
            return "you don't have any credit"
        }
        else if(val > this.totalCredit){
            val-=this.totalCredit;
            this.totalCredit =0;
            return this.clientName+" Your Total Credit becomes 0, collect "+val;
        }
        else{
            this.totalCredit-=val;
            return this.clientName+" Ok your Total Credit became "+this.totalCredit;
        }
    };
