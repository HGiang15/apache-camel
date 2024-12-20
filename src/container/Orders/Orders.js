import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.css";

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fix cứng tạm
    const fixedOrders = [
        { id: 1, date: "26/11/2024", total: "200.000" },
        { id: 2, date: "27/12/2024", total: "250.000" },
        { id: 3, date: "28/10/2024", total: "300.000" },
        { id: 4, date: "29/09/2024", total: "150.000" },
        { id: 5, date: "20/07/2024", total: "500.000" },
        { id: 6, date: "21/06/2024", total: "700.000" },
        { id: 7, date: "22/03/2024", total: "100.000" },
        { id: 8, date: "23/06/2024", total: "350.000" },
        { id: 9, date: "16/06/2024", total: "350.000" },
        { id: 10, date: "12/09/2024", total: "950.000" },
        { id: 11, date: "02/06/2024", total: "450.000" },
    ];

    // Get API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response =await fetch("http://localhost:8080/api/camel/orders/all");
                if (!response.ok) {
                    throw new Error("Không thể lấy dữ liệu đơn hàng chi tiết");
                }
                const ords =await response.json();
                if (!ords || ords.length === 0) {  // Kiểm tra nếu không có dữ liệu
                    console.log("Không có đơn hàng nào");
                    setTimeout(() => {
                        navigate("/");
                    }, 5000);
                }
                else{
                    setOrders(ords);
                    setLoading(false);
                }
            } catch (error) {
                setError("Không thể lấy dữ liệu đơn hàng");
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleDelete = (orderId) => {
        setOrders(orders.filter((order) => order.id !== orderId));
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-text">Đang tải...</div>
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="orders-container">
    <div className="orders-grid">
        {orders.map((order) => (
            <div className="order-card" key={order.id}>
                <h3>Đơn hàng #{order.id}</h3>
                <p>Ngày Order: {order.date}</p>
                <p>Thành tiền: {order.totalMoney}k VNĐ</p>
                <div className="order-actions">
                    <Link to={`/orderdetail/${order.id}`}>
                        <button className="order-detail-btn">Xem chi tiết</button>
                    </Link>
                    <button
                        className="order-delete-btn"
                        onClick={() => handleDelete(order.id)}
                    >
                        Xóa
                    </button>
                </div>
            </div>
        ))}
    </div>
    <button className="back-btn" onClick={handleGoBack}>
        Quay lại
    </button>
</div>

    );
};

export default Orders;
