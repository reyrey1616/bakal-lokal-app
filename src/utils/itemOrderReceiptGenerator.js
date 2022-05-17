import currencyFormat from "./currencyFormat";
const receiptItemsOrderedGenerator = (cartItems) => {
  const templatedProducts =
    cartItems &&
    cartItems.length > 0 &&
    cartItems.map((item) => template(item)).join("");
  const merchants =
    cartItems &&
    cartItems.length > 0 &&
    cartItems.map((item) => item.product.merchant.name);
  return {
    items: templatedProducts,
    merchants,
    tabledProducts: `<table style="border:1px solid;width:100%;margin:0;" border="1"> 
		
			<thead>
				<th>Product</th>
				<th>Quantity</th>
				<th>Price</th>

			</thead>
			<tbody>
				${templatedProducts}
			</tbody>
		</table>`,
  };
};

const template = (cartItem) => {
  return `<tr>
			<td>
				<p style="margin:0;"> Item: ${cartItem.product.name} </p>
				<p style="margin:0;">
					Seller: ${cartItem.product.merchant.name}
				</p>
				<p style="margin:0;">
				${cartItem?.variant ? `Variation" ${cartItem?.variant}` : ""}
				</p>
			</td>

			<td>
				<center> <p style="margin:0;">  ${cartItem.quantity} </p> </center>
			</td>

			<td>
				<center><p style="margin:0;"> ${currencyFormat(cartItem.buyPrice)} </p></center>
			</td>
		</tr>`;
};

export default receiptItemsOrderedGenerator;
