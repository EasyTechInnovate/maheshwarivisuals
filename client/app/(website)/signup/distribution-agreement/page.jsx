'use client'
import { HeadingText, MainHeadingText } from '@/components/FixedUiComponents'
import React, { useState } from 'react'

const page = () => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <div className="bg-[#151A27] min-h-screen flex flex-col w-full overflow-hidden items-center justify-center py-10 pt-[100px]">
      <HeadingText text="Distribution Agreement" />
      
      <div className="max-w-6xl w-full mx-auto px-4 mt-8 space-y-8 text-gray-300">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white mb-10">INTELLECTUAL PROPERTY AGREEMENT / DISTRIBUTION AGREEMENT / MV AGREEMENT</h2>
          <p className="text-sm">This Intellectual Property Agreement (hereinafter referred to as "Agreement") is executed on the signup date of the Firm</p>
          <p className="text-sm">We are a Firm named "Maheshwari Visuals", based out of Uttar Pradesh and the Industry we cater to is "Sound & Video recordings"</p>
        </div>

        {/* Parties Section */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">BY AND BETWEEN</h3>
          <div className="space-y-4">
            <div>
              <p><strong className="text-white">Maheshwari Visuals</strong> having the website <a href="http://www.maheshwarivisuals.com" className="text-blue-400 hover:text-blue-300">www.maheshwarivisuals.com</a> and <a href="http://www.distribution.maheshwarivisuals.com" className="text-blue-400 hover:text-blue-300">www.distribution.maheshwarivisuals.com</a> ("Maheshwari Visuals", "Firm", "we", "us" and "our"), a sole Proprietorship Firm having its registered office at:</p>
              <div className="mt-2 p-3 bg-[#232938] rounded border-l-4 border-blue-500">
                <p className="text-sm">"Galla Mandi Road, Near Kachhala Bus Stand, C/O HARSHIT MAHESHWARI, Galla Mandi Road, Bilsi, Budaun, Uttar Pradesh, 243633, India"</p>
              </div>
            </div>
            <div>
              <p><strong className="text-white">AND</strong></p>
              <p>This Agreement applies to User who use the services of the platform (the "Digital Distribution Services, Marketing services, CMS, Merch launch,") and shall be effective as of the date you sign up to the Platform.</p>
            </div>
          </div>
        </div>

        {/* Terms and Definitions */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Agreement Definitions</h3>
          <div className="space-y-3 text-sm">
            <p>In this Agreement, the party granting the right to use the licensed property, <strong>User</strong>, will be referred to as the "User" and the party who is receiving the right to use the licensed property, <strong>Firm</strong>, will be referred to as the "Firm."</p>
            <ul className="space-y-2 ml-4">
              <li>• User owns all proprietary rights in and to the copyright-able and/or copyrighted works described in this Agreement. The copyrighted works will collectively be referred to as "Work."</li>
              <li>• User owns all rights in and to the Work and retains all rights to the Work, which are not transferred herein.</li>
              <li>• Firm desires to obtain, and User has agreed to grant, a license authorizing the use of the Work by User in accordance with the terms and conditions of this Agreement.</li>
            </ul>
          </div>
        </div>

        {/* Section 1: Grant of License */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">1. GRANT OF LICENSE</h3>
          <p>User owns Property To Be Licensed ("Property"). In accordance with this Agreement, User grants Firm an <strong className="text-white">exclusive license</strong> to Use or Sell the Property. User retains title and Ownership of the Property. Firm will own all rights to materials, products or other works (the Work) created by Firm in connection with this license.</p>
        </div>

        {/* Section 2: Rights and Obligations */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">2. RIGHTS AND OBLIGATIONS</h3>
          <p>Firm shall be the sole owner of the Work and all proprietary rights in and to the Work; however, such ownership shall not include ownership of the copyright in and to the Property or any other rights to the Property not specifically granted in this Agreement.</p>
        </div>

        {/* Section 3: Payment */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">3. PAYMENT</h3>
          <p className="mb-4">Firm agrees to pay User a royalty which shall be calculated as follows:</p>
          
          {/* Royalty Tables */}
          <div className="space-y-6">
            {/* One Song/Album */}
            <div>
              <h4 className="text-lg font-medium text-white mb-3">Distribution Services</h4>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-600 rounded-lg">
                  <thead className="bg-[#232938]">
                    <tr>
                      <th className="border border-gray-600 p-3 text-left text-white">Plan Name</th>
                      <th className="border border-gray-600 p-3 text-left text-white">Royalty (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-600 p-3">One Song Distribution Service</td>
                      <td className="border border-gray-600 p-3 font-semibold">90%</td>
                    </tr>
                    <tr className="bg-[#1F2433]">
                      <td className="border border-gray-600 p-3">One Album Distribution Service</td>
                      <td className="border border-gray-600 p-3 font-semibold">90%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Artist Plan */}
            <div>
              <h4 className="text-lg font-medium text-white mb-3">Artist Plan</h4>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-600 rounded-lg">
                  <thead className="bg-[#232938]">
                    <tr>
                      <th className="border border-gray-600 p-3 text-left text-white">Plan</th>
                      <th className="border border-gray-600 p-3 text-left text-white">Royalty (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-600 p-3">3 Months Starter Plan</td>
                      <td className="border border-gray-600 p-3 font-semibold">70%</td>
                    </tr>
                    <tr className="bg-[#1F2433]">
                      <td className="border border-gray-600 p-3">6 Months Advance Plan</td>
                      <td className="border border-gray-600 p-3 font-semibold">80%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 p-3">1 Year Pro Plan</td>
                      <td className="border border-gray-600 p-3 font-semibold">90%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Label Plan */}
            <div>
              <h4 className="text-lg font-medium text-white mb-3">Label Plan</h4>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-600 rounded-lg">
                  <thead className="bg-[#232938]">
                    <tr>
                      <th className="border border-gray-600 p-3 text-left text-white">Plan</th>
                      <th className="border border-gray-600 p-3 text-left text-white">Royalty (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-600 p-3">3 Months Starter Plan</td>
                      <td className="border border-gray-600 p-3 font-semibold">70%</td>
                    </tr>
                    <tr className="bg-[#1F2433]">
                      <td className="border border-gray-600 p-3">6 Months Advance Plan</td>
                      <td className="border border-gray-600 p-3 font-semibold">80%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 p-3">1 Year Pro Plan</td>
                      <td className="border border-gray-600 p-3 font-semibold">90%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Aggregators Notice */}
            <div className="bg-[#232938] p-4 rounded-lg border border-gray-600">
              <p className="text-blue-300"><strong>For Aggregators:</strong> There is a custom agreement with custom terms and conditions. Fill the apply now aggregator form. Our dedicated team will coordinate you.</p>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="mt-6 space-y-3 text-sm">
            <p><strong>3.2</strong> We will pay you a share of the net revenue received from different distribution platforms and networks, after deduction of content IPR Users payment or any such 3rd party payment if any.</p>
            <p><strong>3.3</strong> The User will be liable to pay separately for marketing/promotion/playlist pitching/advertisement services. The consideration towards such services shall be decided upon mutual agreement between the Parties.</p>
            <p><strong>3.4</strong> In the event the User wants to take down the Property, they shall be liable to pay <strong>Rs. 500/-</strong> as take-down fees.</p>
            <p><strong>3.5</strong> In the event of any infringement notice or claims, the User shall be liable to pay <strong>Rs. 5000/-</strong> as take-down fees.</p>
            <p><strong>3.6</strong> In the event the User wants to release the Property on Metadata or update it or re-release it, they shall be liable to pay <strong>Rs. 100/-</strong> per release.</p>
            <p><strong>3.7</strong> The User will receive the analytical report post release of the Property, and they shall be given after every <strong>90 days</strong>.</p>
            <p><strong>3.8</strong> The User will be liable to pay DSP Fees, taxes, claims and deductions, and the same shall be deducted from the Royalty fees.</p>
          </div>
        </div>

        {/* Section 4: Modifications */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">4. MODIFICATIONS</h3>
          <p>Unless the prior written approval of User is obtained, Firm may not modify or change the Property in any manner. User shall not use Licensed property for any purpose that is unlawful or prohibited by these Terms of the Agreement.</p>
        </div>

        {/* Section 5: Defaults */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">5. DEFAULTS ON AGREEMENT</h3>
          <p>If Firm fails to abide by the obligations of this Agreement, including the obligation to make a royalty payment when due, User shall have the option to cancel this Agreement by providing <strong>30 days written notice</strong> to Firm. Firm shall have the option of taking corrective action to cure the default to prevent the termination of this Agreement if said corrective action is enacted prior to the end of the time period stated in the previous sentence.</p>
        </div>

        {/* Section 6: Warranties */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">6. WARRANTIES</h3>
          <p>Neither party makes any warranties with respect to the use, sale or other transfer of the Property by the other party or by any third party, and Firm accepts the product <strong>"AS IS."</strong> In no event will User be liable for direct, indirect, special, incidental, or consequential damages, that are in any way related to the Property.</p>
        </div>

        {/* Section 7: Transfer of Rights */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">7. TRANSFER OF RIGHTS</h3>
          <p>Neither party shall have the right to assign its interests in this Agreement to any other party, unless the prior written consent of the other party is obtained.</p>
        </div>

        {/* Section 8: Damages */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">8. DAMAGES</h3>
          <div className="space-y-3">
            <p>In the event of any default on the part of the User of the terms and conditions of this Agreement, the User shall be liable for damages to a minimum amount of <strong>Rs. 10,000/-</strong>, except for the other damages and claims as applicable upon the User for default. The User shall also not be entitled to the Royalty fees for the term of this Agreement.</p>
            <p>In the event of multiple infringement claims against the Property, the Royalty fees shall be not payable. Firm can also impose the penalties for the damages.</p>
          </div>
        </div>

        {/* Section 9: Indemnification */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">9. INDEMNIFICATION</h3>
          <p>Each party shall indemnify and hold the other harmless for any losses, claims, damages, awards, penalties, or injuries incurred by any third party, including reasonable attorney's fees, which arise from any alleged breach of such indemnifying party's representations and warranties made under this Agreement. This indemnity will survive the termination of this Agreement.</p>
        </div>

        {/* Section 10: Amendment */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">10. AMENDMENT</h3>
          <p>This Agreement may be modified or amended, only if the amendment is made in writing and is signed by both parties.</p>
        </div>

        {/* Section 11: Term */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">11. TERM</h3>
          <div className="space-y-3">
            <p>This Agreement shall come in force from the signup date ("Effective Date") for all the purposes of this Agreement.</p>
            <p>This Agreement shall be in place for a period of <strong>1 Year</strong> and the same shall auto-renew unless terminated by either of the Parties, as per the terms and conditions of this Agreement.</p>
          </div>
        </div>

        {/* Section 12: Termination */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">12. TERMINATION</h3>
          <div className="space-y-3 text-sm">
            <p>This Agreement may be terminated by either party by providing <strong>90 days written notice</strong> to the other party. This Agreement shall terminate automatically on Termination Date.</p>
            <p><strong>i.</strong> Upon termination or expiration of this Agreement, Licensee Firm shall cease reproducing, advertising, marketing and distributing the Work as soon as is commercially feasible.</p>
            <p><strong>ii.</strong> Termination or expiration of this Agreement shall not extinguish any of Licensee's or Copyright User's obligations under this Agreement including, but not limited to, the obligation to pay royalties which by their terms continue after the date of termination or expiration.</p>
          </div>
        </div>

        {/* Section 13: Severability */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">13. SEVERABILITY</h3>
          <p>If any provision of this Agreement shall be held to be invalid or unenforceable for any reason, the remaining provisions shall continue to be valid and enforceable. This Agreement contains the entire agreement of the parties and there are no other promises or conditions in any other agreement whether oral or written.</p>
        </div>

        {/* Section 14: Dispute Resolution */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">14. DISPUTE RESOLUTION</h3>
          <div className="space-y-3 text-sm">
            <p>The Parties agree to first mediate any disputes or claims between them in good faith and resolve the disputes amicably and share the cost of mediation equally.</p>
            <p>In the event that mediation fails, any controversy or claim arising out of or relating to this Agreement shall be settled by <strong>Arbitration</strong> in accordance with the Arbitration and Conciliation Act of India, 1996.</p>
            <p>All hearings shall be held at <strong>Uttar Pradesh, India</strong> and shall be conducted in English. The parties shall each appoint an arbitrator who shall then appoint a sole arbitrator to preside over the Arbitration proceedings.</p>
          </div>
        </div>

        {/* Section 15: Governing Law */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">15. GOVERNING LAW JURISDICTION</h3>
          <p>This Agreement shall be governed by and construed in accordance with the <strong>laws of India</strong> only. Each party hereby irrevocably submits to the exclusive jurisdiction of the courts of <strong>Uttar Pradesh</strong>, for the adjudication of any dispute hereunder or in connection herewith.</p>
        </div>

        {/* Section 16: Notice */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">16. NOTICE</h3>
          <p className="mb-4">Any notice, direction or instruction given under this Agreement shall be in writing and delivered registered post, cable, facsimile or telex to the addresses as set forth at the start of the said agreement. E-mail communication will also be accepted as a legal notice/claim/notice of termination served on the Firm.</p>
          
          {/* Contact Information */}
          <div className="bg-[#232938] p-4 rounded-lg border border-gray-600">
            <h4 className="text-lg font-medium text-white mb-3">Maheshwari Visuals - Contact Information</h4>
            <div className="space-y-2 text-sm">
              <p><strong>Address:</strong> Maheshwari Complex, Near Gandhi Park, Bilsi, Uttar Pradesh, India, 243633</p>
              <p><strong>Call:</strong> <a href="tel:+910583796906" className="text-blue-400 hover:text-blue-300">+91 05833796906</a></p>
              <p><strong>WhatsApp:</strong> <a href="https://wa.me/917599755643" className="text-blue-400 hover:text-blue-300">+91 7599755643</a></p>
              <p><strong>Email:</strong> <a href="mailto:Contact@maheshwarivisuals.com" className="text-blue-400 hover:text-blue-300">Contact@maheshwarivisuals.com</a></p>
            </div>
          </div>
        </div>

        {/* Required Documents */}
        <div className="bg-[#1A1F2E] p-6 rounded-lg border border-gray-600">
          <h3 className="text-xl font-semibold text-white mb-4">📋 After Sign Up: Required Self Attested Documents</h3>
          <ul className="space-y-2 text-sm">
            <li>1. Certificate of Incorporation (if applicable)</li>
            <li>2. GST Certificate (if applicable)</li>
            <li>3. Cancelled Cheque</li>
            <li>4. PAN Card Copy</li>
            <li>5. Aadhaar Card Copy</li>
          </ul>
        </div>

        {/* Terms Acceptance */}
        <div className="mt-12 p-6 bg-[#1A1F2E] rounded-lg border border-gray-600">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="accept-terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="accept-terms" className="text-sm text-gray-300 flex-1">
              I accept the terms and conditions of this Distribution Agreement and understand all the clauses, payment terms, and obligations mentioned above.
            </label>
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-center pb-10">
          <button 
            disabled={!acceptedTerms}
            className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
              acceptedTerms 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default page