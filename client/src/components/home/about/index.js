import React from 'react'

const About = () => {
    return (
        <div className='w-full h-full flex items-center justify-center '>
            <div className='bg-bgColor rounded-lg md:p-12 py-6 px-3 flex flex-col gap-4 relative'>
                <div className='absolute -top-16 -left-16 md:block hidden'>
                    <img src="/images/pattern-small.png" alt="Pattern" />
                </div>
                <h3 className='text-4xl font-bold capitalize text-primary'>
                About  <span className='text-secondary ml-2'>Us</span>
                </h3>
                <p className='text-[15px] text-primaryLight'>Precision Games is a platform that enables gamers to sell their gaming-related products and services. We offer a wide range of products and services, from game keys and in-game items to coaching and boosting services.Precision Games was founded in 2022 with the goal of providing gamers with a safe and easy way to sell their gaming-related products and services. We are based in the United States and our team consists of experienced gamers who are passionate about helping others get the most out of their gaming experience.</p>
                
                <p className='text-[15px] text-primaryLight'>
                At Precision Games, we are passionate about video gaming and its growing industry. Our mission is to provide a platform for gamers and businesses to connect and thrive. We aim to be the leading resource for all things gaming, from the latest news and releases, to tips and tutorials.Precision Games was founded in 2022 by a group of friends who share a love for gaming. What started as a small website has now grown into a thriving business with a team of dedicated gamers who are committed to bringing you the best gaming content on the web!
                </p>
        
                <div className='absolute -bottom-16 -right-16 md:block hidden'>
                    <img src="/images/pattern-small.png" alt="Pattern" />
                </div>
            </div>
        </div>
    )
}

export default About