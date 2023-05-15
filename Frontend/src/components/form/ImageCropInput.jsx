import React, { useState, useRef } from "react";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const ImageCropInput = ({ onChange, aspectRatio, required = "required" }) => {
	const [image, setImage] = useState(null);

	const cropperRef = useRef(null);

	const handleCropImage = async () => {
		if (typeof cropperRef.current?.cropper === "undefined") {
			return;
		}
		cropperRef.current?.cropper
			.getCroppedCanvas({
				width: 800,
				height: 440,
			})
			.toBlob((blob) => {
				onChange(
					new File([blob], "banner.png", {
						type: "image/png",
					})
				);
			});
	};

	return (
		<>
			<input
				type="file"
				accept="image/*"
				onChange={(e) => {
					const reader = new FileReader();
					reader.onload = () => {
						setImage(reader.result);
					};
					reader.readAsDataURL(e.target.files[0]);
				}}
				required={required}
			/>
			{image && (
				<div>
					<Cropper
						src={image}
						ref={cropperRef}
						aspectRatio={aspectRatio}
						guides={true}
						crop={handleCropImage}
					/>
				</div>
			)}
		</>
	);
};

export default ImageCropInput;
