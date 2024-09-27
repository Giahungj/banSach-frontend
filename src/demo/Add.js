import { useState } from "react";

function AddProduct({ onAddTask }) {
    const [input, setInput] = useState(""); 

    return (
        <>
            Thêm sản phẩm mới:{" "}
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={() => onAddTask(input)}>Add</button>
        </>
    );
}

function Product({ item, onChangeProduct, onDeleteProduct }) {
    const [isEditing, setEditing] = useState(false);

    return (
        <li key={item.id}>
            <input
                type="checkbox"
                checked={item.done}
                onChange={(e) =>
                    onChangeProduct({ ...item, done: e.target.checked })
                }
            />
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={item.text}
                        onChange={(e) =>
                            onChangeProduct({ ...item, text: e.target.value })
                        }
                    />
                    <button onClick={() => setEditing(false)}>Save</button>
                </>
            ) : (
                <>
                    {item.text}
                    <button onClick={() => setEditing(true)}>Edit</button>
                </>
            )}
            <button onClick={() => onDeleteProduct(item.id)}>Delete</button>
        </li>
    );
}

function ListProduct({ items, onChangeProduct, onDeleteProduct }) {
    return (
        <ul>
            {items.map((item) => (
                <Product
                    key={item.id}
                    item={item}
                    onChangeProduct={onChangeProduct}
                    onDeleteProduct={onDeleteProduct}
                />
            ))}
        </ul>
    );
}

export default function ProductApp() {
    const initial = [
        { id: 0, text: "Giày thể thao", done: true },
        { id: 1, text: "Áo thun thể thao", done: false },
        { id: 2, text: "Bóng chuyền loại lớn", done: false },
    ];

    const [items, setItems] = useState(initial);
    let nextId = items.length;

    function handleAdd(text) {
        setItems([
            ...items,
            {
                id: nextId++,
                text: text,
                done: false,
            },
        ]);
    }

    function handleChange(item) {
        setItems(
            items.map((i) => (i.id === item.id ? item : i))
        );
    }

    function handleDelete(itemId) {
        setItems(items.filter((i) => i.id !== itemId));
    }

    return (
        <>
            <AddProduct onAddTask={handleAdd} />
            <ListProduct
                items={items}
                onChangeProduct={handleChange}
                onDeleteProduct={handleDelete}
            />
        </>
    );
}
