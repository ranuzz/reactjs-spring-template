import { connect } from 'react-redux';
import Item from './Item';
import { addItem, createItemAsync } from './ItemSlice';


const mapStateToProps = (state) => ({
    items: state.item.items
})

const mapDispatchToProps = (dispatch) => ({
    addItem: (item) => {
        dispatch(addItem(item));
        dispatch(createItemAsync(item));
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Item);