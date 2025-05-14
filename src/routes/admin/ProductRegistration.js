import React, { useState } from 'react';
import axios from 'axios';
import classNames from 'classnames'; // classnames 라이브러리 import
import './ProductRegistration.css'; // 기본 CSS 파일

const ProductRegistration = () => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    content: '',
    stock: '',
    itemStatus: 'NEW',
    category: 'SOUP',
    subCategory: 'TANG',
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // 폼 제출 시 페이지 리로딩 방지

    const formData = new FormData();
    formData.append('itemFormDto', new Blob([JSON.stringify(form)], { type: 'application/json' }));
    images.forEach((file) => formData.append('itemImgFile', file));

    try {
      const response = await axios.post('/admin/item/new', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('상품 등록 성공! ID: ' + response.data);
      window.location.reload(); // 상품 등록 성공 알림
    } catch (error) {
      console.error(error);
      alert('상품 등록 실패: ' + (error.response?.data?.error || error.message)); // 오류 알림
    }
  };

  return (
    <div>
      <h2 className="title">상품 등록</h2>
      <form className="form" onSubmit={handleSubmit}> {/* form의 onSubmit에 핸들러 연결 */}
        <input
          className={classNames('input-field')}
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="상품명"
        />
        <input
          className={classNames('input-field')}
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="가격"
          type="number"
        />
        <textarea
          className={classNames('input-field')}
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="상품 설명"
        />
        <input
          className={classNames('input-field')}
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="재고"
          type="number"
        />

        <select
          className={classNames('input-field')}
          name="itemStatus"
          value={form.itemStatus}
          onChange={handleChange}
        >
          <option value="BEST">BEST</option>
          <option value="NEW">NEW</option>
        </select>

        <select
          className={classNames('input-field')}
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="SOUP">Soup</option>
          <option value="ROAST">Roast</option>
          <option value="PASTA">Pasta</option>
          <option value="ANJU">Anju</option>
        </select>

        <select
          className={classNames('input-field')}
          name="subCategory"
          value={form.subCategory}
          onChange={handleChange}
        >
          <option value="Noodle">Noodle</option>
          <option value="JJIGAE">Jjigae</option>
          <option value="TANG">Tang</option>
          <option value="SUSHI">Sushi</option>
          <option value="FRIED">Fried</option>
        </select>

        <input
          className={classNames('input-file')}
          type="file"
          multiple
          onChange={handleFileChange}
        />
        <button className="submit-btn" type="submit">상품 등록</button> {/* type="submit"으로 변경 */}
      </form>
    </div>
  );
};

export default ProductRegistration;
