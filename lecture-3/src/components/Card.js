import React, {useEffect, useRef} from 'react'

function Card(props) {
	const imgRef = useRef(null);

	useEffect(() => {
		const options = {}; // 옵션
		const callback = (entries, observer) => { // 가시성이 변경 될때마다 실행할 함수
			// entries - 가시성이 변한 요소
			entries.forEach(entry => {
				if(entry.isIntersecting) {
					const target = entry.target;
					const previousSibling = target.previousSibling;

					console.log('is intersecting', entry.target.dataset.src);
					// entry.target.src = entry.target.dataset.src
					target.src = target.dataset.src;
					previousSibling.srcset = previousSibling.dataset.srcset;
					observer.unobserve(entry.target); // observer 해제, 한번 이미지를 로드하면 다시 로드할 필요가 없다.
				}
			})
		}

		const observer = new IntersectionObserver(callback, options);
		// observer 인스턴스를 이용해 원하는 요소를 관찰 가능
		observer.observe(imgRef.current);

		return () => observer.disconnect(); // intersection observer 인스턴스 없앰
	}, [])

	return (
		<div className="Card text-center">
			{/*<img data-src={props.image} ref={imgRef} alt={''}/>*/}
			<picture>
				<source data-srcset={props.webp} type="image/webp" />
				{/*<source data-srcset={props.webp} type={'image/not-support'} />*/}
				<img data-src={props.image} ref={imgRef} alt={''}/>
			</picture>
			<div className="p-5 font-semibold text-gray-700 text-xl md:text-lg lg:text-xl keep-all">
				{props.children}
			</div>
		</div>
	)
}

export default Card
