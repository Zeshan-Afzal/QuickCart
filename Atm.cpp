#include <iostream>
#include <string>
using namespace std;

struct Accounts{
string name;
int accountNumber;
int pin;
long balance;

};

  Accounts account[]={{"Jammal", 12423, 345, 40050},
    {"Shabeer", 23456, 234, 2300},
    {"Chuhan", 34567, 150, 4150},
    {"Parvez", 45678, 172, 1500},
    {"Sultan", 56789, 225, 4000},
    {"Kashif", 67890, 332, 500}};
   string menu[]={"Check Balance", "Deposit Money","Withdraw Money", "Transfer Money"};
 void checkBalanc(int);
 void depositMoney(int );
 void withdrawMoney(int);
 void transferMoney(int);
 void exitOrNot(int, int);
 void displayMainMenu();
    void displayManue(int accNo){
      int selectedVal;
      cout<<"\t\n---Welcome to your account---"<<endl;

      cout<<"\nSelect from the given Menu"<<endl;
      for(int i=0 ; i<sizeof(menu)/sizeof(menu[0]); i++){
        cout<<i+1<<": " <<"\t" <<menu[i]<<endl;


      }
      cin>>selectedVal;
      switch(selectedVal-1){
       case 0:{
         checkBalanc(accNo);
         break;
       }
       case 1:{
           depositMoney(accNo);
           break;
       }
       case 2:{
         withdrawMoney(accNo);
         break;
       }
       case 3:{
         transferMoney(accNo);
         break;
       }

    } }
    void checkBalanc(int accNo){
        int balance;
        int check;
    for(int i=0; i<sizeof(account)/sizeof(account[0]); i++){
        if(account[i].accountNumber==accNo){
            balance=account[i].balance;

        }

    }

    cout<<" Your Account Balance is Rs "<< balance<< endl;
      cout<<"Enter 1 for menu Or 0 to exit Or 9 for main menu and logout"<<endl;
     cin>>check;
         switch(check){
       case 1:{
         exitOrNot(check, accNo);
         break;
       }
       case 0:{
                 exitOrNot(check ,accNo);
        break;
       }
        case 9:{
                 exitOrNot(check ,accNo);
        break;
       }
       default:{
        cout<<"Please select between 0 or 1"<<endl;
        cin>>check;
                 exitOrNot(check, accNo);
       }
       }




    };
    void depositMoney(int accNo){
        int check;
        int amount;
        cout<<"Enter the amount you want to deposit:"<<endl;
        cin>>amount;

    for(int i=0; i<sizeof(account)/sizeof(account[0]); i++){
        if(account[i].accountNumber==accNo){
         account[i].balance+=amount;

        }

    }
      cout<<amount<< " Rs has been deposit to your account successfully"<<endl;
      checkBalanc(accNo);
      cout<<"Enter 1 for menu Or 0 to exit Or 9 for main menu and logout"<<endl;
       cin>>check;
         switch(check){
       case 1:{
         exitOrNot(check, accNo);
         break;
       }
       case 0:{
                 exitOrNot(check ,accNo);
        break;
       }
        case 9:{
                 exitOrNot(check ,accNo);
        break;
       }
       default:{
        cout<<"Please select between 0 or 1"<<endl;
        cin>>check;
                 exitOrNot(check, accNo);
       }
       }

    }
    void exitOrNot(int check, int accNo){

         switch(check){
       case 1:{
         displayManue(accNo);
         break;
       }
       case 0:{
        cout<<"program terminated successfully!"<<endl;
        break;
       }
       case 9:{
         displayMainMenu();
         break;
       }
       }
    }
    void withdrawMoney(int accNo){
     int check;
        int amount;
        cout<<"Enter the amount you want to withdraw:"<<endl;
        cin>>amount;

    for(int i=0; i<sizeof(account)/sizeof(account[0]); i++){
        if(account[i].accountNumber==accNo){
         account[i].balance-=amount;

        }

    }
      cout<<amount<< " Rs has been withdraw from your account successfully"<<endl;
      checkBalanc(accNo);
           cout<<"Enter 1 for menu Or 0 to exit Or 9 for main menu and logout"<<endl;
       cin>>check;
         switch(check){
       case 1:{
         exitOrNot(check, accNo);
         break;
       }
       case 0:{
                 exitOrNot(check ,accNo);
        break;
       }
        case 9:{
                 exitOrNot(check ,accNo);
        break;
       }
       default:{
        cout<<"Please select between 0 or 1"<<endl;
        cin>>check;
                 exitOrNot(check, accNo);
       }
       }


    }
     void transferMoney(int accNo){
       int amount ;
       int check;
       int receiverAccNo;
       bool recevierFound =false;
        string accName;
       cout<<"Enter the amount you want to transfer: "<<endl;
       cin>>amount;
       if(amount<1){
         cout<<"Invalid amount! try again"<<endl;
         transferMoney(accNo);
         return;

       }


         for(int i=0; i<sizeof(account)/sizeof(account[0]); i++){
        if(account[i].accountNumber==accNo){
                if(account[i].balance<amount){

                    cout<<"Insufficient Balance!...('^')"<<endl;
                    cout<<"\nWant to deposit some cash? press 1 or 0 to exit!"<<endl;
                    cin>>check;
                    switch(check){
                     case 1:{
                       depositMoney(accNo);
                       break;
                     }
                     case 0:{
                       exitOrNot(check, accNo);
                       break;
                     }
                    }

                    return;

                }

         account[i].balance-=amount;

        }

    }

       cout<<"Enter account no of receiver :"<<endl;
       cin>>receiverAccNo;


           for(int i=0; i<sizeof(account)/sizeof(account[0]); i++){
        if(account[i].accountNumber==receiverAccNo){
         account[i].balance+=amount;
         accName=account[i].name;
         recevierFound=true;
         break;

        }

    }
        if(!recevierFound)
        {
          cout<<"Receiver with provided account no not found! Try again"<<endl;
          transferMoney(accNo);
          return;
        }






    cout<<"Rs: "<<amount<<" has been transfer to Account No- "<<receiverAccNo<< " and Name: "<<accName<<endl;
      cout<<"Enter 1 for menu Or 0 to exit Or 9 for main menu and logout"<<endl;
          cin>>check;
         switch(check){
       case 1:{
         exitOrNot(check, accNo);
         break;
       }
       case 0:{
                 exitOrNot(check ,accNo);
        break;
       }
        case 9:{
                 exitOrNot(check ,accNo);
        break;
       }
       default:{
        cout<<"Please select between 0 or 1"<<endl;
        cin>>check;
                 exitOrNot(check, accNo);
       }
       }


     }
void login(int selAcc){
            cout<<"\t\n Name- "<< account[selAcc -1].name<< " \tAccount No- "<< account[selAcc-1].accountNumber<< endl;
       cout<<" \nEnter you pin to login"<<endl;
        int password;

        cin>>password;

        if(password ==account[selAcc-1].pin){

            cout<<"login Successful"<<endl;
            displayManue( account[selAcc-1].accountNumber);
        } else{
          cout<<"Wrong Pin"<<endl;
        }

}
void displayMainMenu(){
       cout<< " \t-----select your account to porceed---"<<endl;
  int length= sizeof(account)/sizeof(account[0]);
    for(int i=0; i<length; i++){
    cout<<"\n"<< i+1<< ": Name- "<< account[i].name<< " \t\tAccount No- "<< account[i].accountNumber<< endl;

    }
   int accountSelected;

   cin>>accountSelected;

   login(accountSelected );


}

int main(){

 displayMainMenu();
 return 0;


 }
