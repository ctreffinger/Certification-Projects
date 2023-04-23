// Cash Register -- emulates cash register

function checkCashRegister(price, cash, cid) {

    /*
    Price, cash payment and available cash in drawer (array) are received as args
    If total cash in drawer === amount owed, cash in drawer is submitted as change and status = CLOSED
    If drawer does not contain correct amounts to provide exact change, none is given and status = INSUFFICIENT_FUNDS
    If drawer does contain correct amounts to provide exact change, those amounts are given highest to lowest and status = OPEN
    */
    
      let lookUp = {                  // lookUp object for values of currency types
        "ONE HUNDRED": 100,
        "TWENTY": 20,
        "TEN": 10,
        "FIVE": 5,
        "ONE": 1,
        "QUARTER": 0.25,
        "DIME": 0.1,
        "NICKEL": 0.05,
        "PENNY": 0.01
      }
      let register = {
        status: "",
        change: []
      }
      let val = '';                   // may use to indicate denomination
      const owed = cash - price;      // owed gets the difference between price and cash
      let remaining = owed;
      let totalCID = 0.00;            // add up the total value of the CID to this
      
    
      if (owed <= 0) {                // checks first to confirm if payment received was enough for purchase
        console.log('Not enough payment was received');
        register.status = "INSUFFICIENT_FUNDS";
        console.log('STATUS = ' + register.status);
        register.change = [];
        return register;
      }

      console.log("Summing total value in drawer");
      for (let i = 0; i < cid.length; i++) {    // loop through all denominations that can exist
          // adds value of [i] denomination available in drawer to totalCID
          totalCID = (((totalCID * 100) + (cid[i][1] * 100)) / 100);
          console.log(cid[i][0] + " " + cid[i][1]);
          // console.log('CURRENT TOTAL: ' + totalCID);  // prints current total to console for confirmation
      }
    
      console.log("TOTAL CASH = " + totalCID);
      console.log("TOTAL OWED = " + owed);
    
      if (totalCID === owed) {                        // proceeds if value of cash in drawer is same as owed
        console.log('Change owed is equal to amount of change in drawer');
        register.status = "CLOSED";                   // status becomes 'CLOSED'
        console.log('STATUS = ' + register.status);
        register.change = [...cid];                   // register.change gets cash in drawer
        return register;                              // returns register object
      }
    
      else if (totalCID < owed) {                     // proceeds if value of cash in drawer is less than owed
        console.log("Could not give change");
        register.status = "INSUFFICIENT_FUNDS";       // status becomes 'INSUFFICIENT_FUNDS'
        console.log('STATUS = ' + register.status);
        register.change = [];                         // register.change becomes empty array
        return register;                              // returns register object
      }
    
      else {                                          // proceeds if value of cash in drawer is greater than owed
        
        
        for (let i = cid.length - 1; i >= 0; i--) {   // for loop that goes through each denomination
          let currentValue = 0;                       // resets default value for the loop
          let pushChange = false;                     // resets default value for the loop - this will get set to true if change is given for current denomination
          console.log('Change owed remaining: ' + remaining);
          val = cid[i][0];                            // val gets the denomination name from cid arg
          // console.log("Current denomination: " + val);                 // print val (current denomination) to console for reference



          // if remaining amount owed is at least value of current denomination
          if (remaining * 100 >= lookUp[val] * 100) {
            console.log('Total available in ' + cid[i][0] + ': ' + cid[i][1]);

            /*
            // while loop to cycle through remaining currency per remaining unit (has been replaced by following if statement)- this worked but would be inefficient for very large values
            while (cid[i][1] * 100 > 0 && remaining * 100 >= lookUp[val] * 100) {
              console.log(cid[i][0] + ' was removed from drawer (' + (Math.round(remaining * 100) / 100) + ' - ' + (Math.round(lookUp[val] * 100) / 100) + ' -> ' + (Math.round((remaining * 100) - (lookUp[val] * 100)) / 100) + ')');
              remaining = ((Math.round(remaining * 100) - Math.round(lookUp[val] * 100)) / 100);
              cid[i][1] = ((Math.round(cid[i][1] * 100) - Math.round(lookUp[val] * 100)) / 100);
              pushChange = true;
              currentValue = ((Math.round(currentValue * 100) + Math.round(lookUp[val] * 100)) / 100); // currentValue += lookUp[val] but using Math.round()
              // console.log('CURRENT VALUE: ' + currentValue);
            }
            */
              
            if (cid[i][1] * 100 > 0) {  // proceed if denomination is present in drawer
              let numOwed = Math.floor((Math.round(remaining * 100) / Math.round(lookUp[val] * 100)));
              // numAvailable = total value of current drawer slot / value of current denomination
              let numAvailable = (Math.round(cid[i][1] * 100) / Math.round(lookUp[val] * 100));
              if (numOwed >= numAvailable) {
                console.log(cid[i][0] + ' was removed from drawer x' + numAvailable);
                remaining = ((Math.round(remaining * 100) - (Math.round(lookUp[val] * 100) * numAvailable)) / 100);
                pushChange = true;
                currentValue = (Math.round(cid[i][1] * 100) / 100);
              }
              else { // if (numOwed < numAvailable)
                console.log(cid[i][0] + ' was removed from drawer x' + numOwed);
                remaining = ((Math.round(remaining * 100) - (Math.round(lookUp[val] * 100) * numOwed)) / 100);
                pushChange = true;
                currentValue = (numOwed * (Math.round(lookUp[val] * 100) / 100));
              }
            }
            // else do nothing
              
          }
          else {          // proceeds if current denomination is higher than remaining owed
            console.log(lookUp[val] + ' was too high');   // prints if denomination is more than remaining owed
          }
          if (pushChange) {       // if pushChange is true, pushes relevant information to register.change
            register.change.push([val, currentValue]);
            console.log('Pushing value of: [' + val + ',' + currentValue + '] to register.change array');
            console.log('Current change array: ' + register.change);
          }
        }
        console.log('Remaining owed after processing drawer: ' + (Math.round(remaining * 100) / 100));
        if (remaining === 0) {            // proceed if remaining owed is exactly 0.00
          console.log('Exact change was given!');
          register.status = "OPEN";       // register.status gets set to 'OPEN'
          console.log('STATUS = ' + register.status);
          console.log("Change: " + register.change);
          return register;                // returns object
        }
        else if (remaining >= 0.01) {
          console.log("Could not give change");
          register.status = "INSUFFICIENT_FUNDS";       // status becomes 'INSUFFICIENT_FUNDS'
          console.log('STATUS = ' + register.status);
          register.change = [];                         // register.change becomes empty array
          return register;                              // returns register object
        }
        else if ((remaining - Math.floor(remaining)) > 0) {
          console.error('Rounding was incorrect');
        }
        else console.error('Unknown error');
      }
    }
    
    checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
    // checkCashRegister(19.5, 20, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);

/*
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) // should return {status: "OPEN", change: [["QUARTER", 0.5]]}
checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) // should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}
checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) // should return {status: "INSUFFICIENT_FUNDS", change: []}
checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) // should return {status: "INSUFFICIENT_FUNDS", change: []}
checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) // should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}
checkCashRegister(19.5, 20, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) // should return {status: "OPEN", change: [["PENNY", 0.5]]}
*/