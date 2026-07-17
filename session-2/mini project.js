function processOrders(orders) {
    let revenue = 0;
    let success = 0;
    let skipRow = 0;
    let stockFail = 0;
    let msg = '';

    for (let i = 0; i < orders.length; i++) {
        let o = orders[i];

        if (skipRow >= 3 || stockFail >= 3) {
            msg = 'System stopped due to critical failure';
            console.log(msg);
            break;
        }

        if (o.status === 'cancelled' || o.status === 'invalid' || o.stockAvailable === false) {
            skipRow++;
            if (o.stockAvailable === false) stockFail++;
        } else {
            revenue += o.amount;
            success++;
            skipRow = 0;
        }
    }

    return { revenue, success, msg };
}

const orders = [
    { id: 1, status: 'valid', stockAvailable: true, amount: 100 },
    { id: 2, status: 'cancelled', stockAvailable: true, amount: 50 },
    { id: 3, status: 'valid', stockAvailable: false, amount: 75 },
    { id: 4, status: 'invalid', stockAvailable: true, amount: 30 },
    { id: 5, status: 'valid', stockAvailable: true, amount: 200 },
];

console.log(processOrders(orders));