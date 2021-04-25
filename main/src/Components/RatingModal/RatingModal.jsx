import React, {useState} from 'react'
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import style from './style.module.css'

export default function RatingModal({open, name, rating, setRating, submitRating}) {
    const [isModalVisible, setIsModalVisible] = useState(open);

    const handleCancel = () => {
        setIsModalVisible(false);
    };  

    const handleSubmit = () => {
        submitRating()
        setIsModalVisible(false)
    }

    return (
        <div>
            <Modal footer = {null} visible={isModalVisible} onCancel={handleCancel} className = {style.rating} >
                <div>
                    <h2>Help us Improve!</h2>
                    <p>How would you rate {name} ? </p>
                    <input
                        type = "number" 
                        placeholder = "Please give a rating out 5" 
                        style = {{padding: "5px"}} 
                        value = {rating} 
                        onChange = {(e) => setRating(e.target.value)} 
                    />
                    <br />
                    <button onClick = {handleSubmit} > Submit Rating </button>
                </div>
            </Modal>
        </div>
    )
}
