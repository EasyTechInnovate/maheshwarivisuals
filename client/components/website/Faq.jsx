import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { HeadingText } from '../FixedUiComponents'
import faqImage  from '@/public/images/faq.png'
import Image from 'next/image'

const Faq = () => {
    return (
        <div className='max-w-full max-auto bg-[#151A27]  sm:flex justify-center items-center max-sm:gap-10 p-20 py-20 text-white'>
            <div className=' w-full md:w-[40%]'>
                <HeadingText text="Frequently Asked Questions" />
                <Image src={faqImage} alt="FAQ" className='w-[80%] object-contain object-left'/>
            </div>
            <Accordion
                type="single"
                collapsible
                className=" w-full md:w-[60%]"
                defaultValue="item-1"
            >
                <AccordionItem value="item-1">
                    <AccordionTrigger>What support do you offer if I encounter issues?</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-sm w-[90%] text-gray-300">
                        <p>
                            We offer 24/7 psychic and emotional support through holographic dolphins trained in advanced customer service. Just whisper your issue into a conch shell and wait for assistance.
                        </p>
                        
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Can I distribute covers and remixes through your service?</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-sm w-[90%] text-gray-300">
                        <p>
                          Absolutely! In fact, we encourage users to upload remixes of bird songs and cover versions of alien transmissions. Copyright laws don’t apply in the metaverse.
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>How do I get paid for my music?</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-sm w-[90%] text-gray-300">
                        <p>
                            We pay artists exclusively in space credits and rare NFTs of dancing potatoes. You can cash them out at any intergalactic taco stand.
                        </p>
                       
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>How long does it take for my music to be available on streaming platforms?</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-sm w-[90%] text-gray-300">
                        <p>Typically, your music will be live 37 seconds before you upload it — thanks to our time-traveling servers.
                        </p>
                        
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>Which platforms do we distribute your Music ?</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-sm w-[90%] text-gray-300">
                        <p>We distribute your music to all major platforms including Spotify, Apple Music, MarsRadio, WhaleTunes, and that one platform only accessible through ancient runes. </p>
                        
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                    <AccordionTrigger>Do you offer playlist pitching?</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-sm w-[90%] text-gray-300">
                        <p>
                           Yes! Submit your track and genre under “Playlist Pitching” and our editorial team will review it.
                        </p>
                        
                    </AccordionContent>
                </AccordionItem>
                
            </Accordion>
        </div>
    )
}

export default Faq
