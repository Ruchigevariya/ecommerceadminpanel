import React, { useEffect } from 'react';

function Promise_Example(props) {
    const one = () => {
        return "One";
    }
    
    const two = () => {

        // With Promise
        const promise = new Promise((resolve, reject) => {
            setTimeout(()=> {
                resolve ("Two");
            },2000) 
        })
    
        return promise;
        
        // Without Promise
        // setTimeout(()=> {
        //     return "Two";
        // },2000)
    }

    const three = () => {
        return "Three";
    }

    const All = async() => {
        const oneAns = one()
        console.log(oneAns);

        const twoAns = await two()
        console.log(twoAns);

        const threeAns = three()
        console.log(threeAns);
    }

    useEffect(() => {
        All()
    },[])

    const print = (p) => {
        console.log(p);
    }

    const sum = (a,b,callbackFun) => {
        let sum = 0;
        sum = a + b;
        callbackFun(sum)
    }

    sum(10,30,print)

    // const p1 = Promise.resolve(2)
    // const p2 = 2000;
    // const p3 = new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve ("three");
    //     },2000)
    // })
    // Promise.all([p1, p2, p3]).then((values) => {
    //     console.log(values);
    // })

    return (
        <div>
            
        </div>
    );
}

export default Promise_Example;