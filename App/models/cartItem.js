class CartItem{
    constructor(quantity, productPrice, productTitle, total, imgLink, store_ID, type){
        this.quantity = quantity;
        this.productPrice = productPrice;
        this.productTitle = productTitle;
        this.total = total;
        this.imgLink = imgLink;
        this.store_ID = store_ID;
        this.type = type;
    }
}

export default CartItem;