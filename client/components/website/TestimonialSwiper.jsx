import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import testimonial1 from '@/public/images/home/testimonial1.png'
import Image from 'next/image'

const skillingInitiatives = [
    {
        id: 1,
        image: testimonial1,
        name: "Mukul Sharma",
        post: "Rapper & Producer",
        star: 4,
        review: 'Finally a platform that doesn’t take my rights or my revenue. 100% satisfied!',
    },
    {
        id: 2,
        image: testimonial1,
        name: "Vikas Singh",
        post: "Producer",
        star: 5,
        review: 'Finally a platform that doesn’t take my rights or my revenue. 100% satisfied!',
    },
    {
        id: 3,
        image: testimonial1,
        name: "Dev Pawar",
        post: "Singer & Producer",
        star: 5,
        review: 'Finally a platform that doesn’t take my rights or my revenue. 100% satisfied!',
    },
    {
        id: 4,
        image: testimonial1,
        name: "Mukul Sharma",
        post: "Rapper & Producer",
        star: 4,
        review: 'Finally a platform that doesn’t take my rights or my revenue. 100% satisfied!',
    },

]

function Example(stars) {
    const elements = [];
    for (let i = 0; i < stars; i++) {
        elements.push(<p key={i} className='whitespace-nowrap w-fit '>⭐</p>);
    }

    return <div className='flex gap-2'>{elements}</div>;
}

export default function TestimonialSwiper() {
    return (
        <div className="relative w-full h-full">

            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                    dynamicMainBullets: 3
                }}
                navigation={{
                    clickable: true,

                }}
                modules={[Pagination, Navigation, Autoplay]}
                className="mt-8">
                    <style>
                    {`
                    .swiper-button-next,
                    .swiper-button-prev {
                    
                        color: white; 
                        background: #652CD6; 
                        width: 30px; 
                        height: 30px; 
                        padding: 40px;
                        border-radius: 9999px; 
                        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); 
                        transition: all 0.3s ease; 
                        display: flex; 
                        align-items: center; 
                        justify-content: center; 
                       
                    }
                    
                    .swiper-button-prev {
                        left: 0; 
                        transform: translate(40%, -50%); 
                    }

                    .swiper-button-next {
                        right: 0; 
                        transform: translate(-40%, -50%); 
                    }

                    .swiper-button-next:hover {
                        transform: translate(-40%, -50%) scale(1.08); 
                        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); 
                    }

                    .swiper-button-prev:hover {
                        transform: translate(40%, -50%) scale(1.08); 
                        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); 
                    }

                    .swiper-button-next::after,
                    .swiper-button-prev::after {
                        font-size: 18px; 
                        font-weight: bold; 
                    }

                    .swiper-button-next.swiper-button-disabled,
                    .swiper-button-prev.swiper-button-disabled {
                        background-color: #f0f0f0; 
                        color: #652CD6; 
                        cursor: not-allowed; 
                        opacity: 0.5; 
                        
                    }

                    .swiper-pagination-bullet {
                        background-color: white; 
                        opacity: 1; 
                        width: 10px; 
                        height: 10px; 
                        transition: background-color 0.3s ease; 
                    }

                    .swiper-pagination-bullet-active {
                        background-color: #652CD6; 
                    }
                            
                    `}
                    </style>
                {skillingInitiatives.map((initiative) => (
                    <SwiperSlide
                        key={initiative.id}
                        className="px-[5vw] ">
                        <div className="w-full mb-12  rounded-xl overflow-hidden bg-[#fff]/10 backdrop-blur-lg flex flex-col items-center justify-center p-8 py-12 gap-4 border border-gray-500">
                            <div className="w-[90px] h-[90px] rounded-full border-2 mb-8"> <Image src={initiative.image} alt={initiative.name} className='w-full h-full' /></div>
                            <h1 className='text-xl font-semibold'>{initiative.name}</h1>
                            <h1 className='text-base text-gray-400'> {initiative.post}</h1>

                            {initiative.star && Example(initiative.star)}

                            <h1 className='text-gray-300 text-center text-xl w-[60%]'>{initiative.review}</h1>

                        </div>
                    </SwiperSlide>


                ))}
            </Swiper>
           
        </div>

    )
}
