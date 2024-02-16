import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ReviewFormModal.css"

function ReviewFormModal() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  return (
    <>

    </>
  )
}

export default ReviewFormModal;