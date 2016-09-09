

var FilterableProductTable = React.createClass({
    
    mixins: [ReactFireMixin],
    
    getInitialState: function() {
        return {
            items: [],
            filterText: '',
            inStockOnly: false
        };
    },
	
	componentWillMount: function() {
    var firebaseRef = new Firebase('https://sweltering-fire-7944.firebaseio.com/demo/products');
    this.bindAsArray(firebaseRef.limitToLast(25), 'products');
  	},

	handleUserInput: function(filterText, inStockOnly) {
        this.setState({
            filterText: filterText,
            inStockOnly: inStockOnly
        });
    },
    
    
    
    render: function() {
        var products = this.props.products;
        var createItem = function(item, index) {
			  return <li key={index} >product.category</li>;
;
			};
        return (
            <div>
            	<h1>header</h1>
                
                 <ol>
                 {this.props.products.map(createItem)}
                 </ol>
            </div>
        );
    }
});


var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
 
ReactDOM.render(
    <FilterableProductTable  />,
    document.getElementById('container')
);