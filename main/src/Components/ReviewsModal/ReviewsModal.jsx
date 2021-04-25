import React, {useState} from 'react'
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import style from './style.module.css'

export default function ReviewsModal({open, reviews, setReviewsModalOpen}) {
    const [isModalVisible, setIsModalVisible] = useState(open);

    const handleCancel = () => {
        setIsModalVisible(false);
        setReviewsModalOpen(false)
    };  

    return (
        <div>
            <Modal footer = {null} visible={isModalVisible} onCancel={handleCancel} className = {style.modal} >
                <div className = {style.reviwModal} >
                    {
                        reviews.length > 0 ? reviews.map(item => {
                            return(
                                <div key = {item.mentee_photo_url} >
                                    <div className = {style.name} >
                                        <img src = {item.mentee_photo_url} />
                                        <h3> {item.mentee_name} </h3>
                                    </div>
                                    <p> {item.review} </p>
                                </div>
                            )
                        }): <div className = {style.noReview} > There are no reviews yet </div>
                    }
                </div>
            </Modal>
        </div>
    )
}
