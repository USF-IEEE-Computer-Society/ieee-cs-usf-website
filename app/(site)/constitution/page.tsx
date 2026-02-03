import './constitution.css'
import foundingFathers from '@/app/(site)/assets/founding_fathers.png'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Constitution',
  description: 'The official constitution of IEEE Computer Society Student Branch Chapter at the University of South Florida, established May 27, 2021.',
}

export default function ConstitutionPage() {
  return (
    <main className="min-h-screen bg-white py-6 px-4 flex flex-col">
      {/* Scrollable Parchment Container */}
      <div className="constitution-scroll-container max-w-4xl mx-auto w-full" style={{ maxHeight: 'calc(100vh - 300px)' }}>
        {/* Parchment Document */}
        <article className="constitution-parchment">
        {/* Decorative corner logos */}
        <img src="/favicon.ico" alt="IEEE-CS" className="corner-logo top-left" />
        <img src="/favicon.ico" alt="IEEE-CS" className="corner-logo top-right" />

        {/* Inner content wrapper */}
        <div className="constitution-inner">
          {/* Grand Title */}
          <header className="text-center mb-12 pb-8 border-b-2 border-[#8B7355]/30">
            <p className="constitution-established">Established May 27, 2021</p>
            <h1 className="constitution-title">
              <span className="constitution-we">Constitution</span>
            </h1>
            <p className="constitution-subtitle">
              for the
            </p>
            <h2 className="constitution-org-name">
              IEEE – CS Student Branch Chapter
            </h2>
            <p className="constitution-location">
              at the University of South Florida
            </p>
            
            <div className="mt-8 flex justify-center gap-8 text-sm constitution-meta">
              <div>
                <span className="block text-[#5c4a3a]">Founded</span>
                <span className="font-semibold">May 27, 2021</span>
              </div>
              <div className="border-l border-[#8B7355]/30 pl-8">
                <span className="block text-[#5c4a3a]">Last Amended</span>
                <span className="font-semibold">April 23, 2024</span>
              </div>
              <div className="border-l border-[#8B7355]/30 pl-8">
                <span className="block text-[#5c4a3a]">Last Reviewed</span>
                <span className="font-semibold">April 23, 2024</span>
              </div>
            </div>
          </header>

          {/* Article I */}
          <section className="constitution-article">
            <h3 className="article-title">Article I</h3>
            <h4 className="article-subtitle">NAME</h4>
            <p>
              The name of this student organization shall be the <em>Institute of Electrical and Electronics Engineers – Computer Society Student Branch Chapter at the University of South Florida</em> hereafter referred to as any of the following:
            </p>
            <ol className="constitution-list" type="A">
              <li>IEEE – Computer Society Student Branch Chapter at the University of South Florida</li>
              <li>IEEE – Computer Society Student Branch Chapter at USF</li>
              <li>IEEE–CS Student Branch Chapter at the University of South Florida</li>
              <li>IEEE–CS Student Branch Chapter at USF</li>
              <li>IEEE – Computer Society at the University of South Florida</li>
              <li>IEEE – Computer Society at USF</li>
              <li>IEEE–CS at the University of South Florida</li>
              <li>IEEE–CS at USF</li>
              <li>IEEE – Computer Society</li>
              <li>IEEE–CS</li>
              <li>Or any other alternative variation of the organization&apos;s name and equivalent abbreviation, including but not limited to replacing &quot;at&quot; with &quot;@&quot; or removing &quot;–&quot; in such name or variation.</li>
            </ol>
          </section>

          {/* Article II */}
          <section className="constitution-article">
            <h3 className="article-title">Article II</h3>
            <h4 className="article-subtitle">PURPOSE, GOALS, and AFFILIATION</h4>
            <p>
              The purpose and goal of this student organization are to bring together students at the University of South Florida (USF) to learn, network, collaborate, and share ideas regarding the theory and practice of all aspects of computer science and engineering, while promoting professional development through student-led talks and outreach activities.
            </p>
            <p>
              This organization is affiliated with the <strong>Institute of Electrical and Electronics Engineers – Computer Society (IEEE–CS)</strong>.
            </p>
            <p>
              This organization is associated with the <strong>USF Department of Computer Science and Engineering (CSE)</strong>.
            </p>
          </section>

          {/* Article III */}
          <section className="constitution-article">
            <h3 className="article-title">Article III</h3>
            <h4 className="article-subtitle">MEMBERSHIP QUALIFICATIONS</h4>
            
            <h5 className="section-heading">A. Requirement for Membership</h5>
            <p>
              Only undergraduate and graduate students currently enrolled in the University of South Florida – all campuses are eligible for membership. 100% of active membership must be USF students and open to all students. Associate members may be USF faculty, staff, or alumni and spouses and domestic partners of student members. These associate members shall not be given the rights and privileges of active USF students including but not limited to voting rights, use of facilities, or equipment, and/or benefits from student-funded resources.
            </p>

            <h5 className="section-heading">B. Length of Term for membership</h5>
            <p>
              Membership will take effect when an interested party confirms membership on the organization roster. Active membership continues for one (1) academic school year or until an individual has been removed by the organization. Associative membership continues until either the individual withdraws or has been removed by the organization.
            </p>

            <h5 className="section-heading">C. Requirements for continued membership</h5>
            <p>
              Members are required to uphold the objectives and purpose of the organization, and to comply with University policies. They must also be currently enrolled students. These are the only requirements for membership.
            </p>

            <h5 className="section-heading">D. Specifications for the removal of members from the group</h5>
            <p>
              If any member fails to uphold the purpose and objectives of the organization, does not meet membership requirements, or does not comply with University policies, he/she may be held accountable and in jeopardy of losing their membership. Reason for removal of member must be presented to the Executive Board. Written notification shall then be presented with reason for removal to the member in question. The member in question has the right to speak to the board on their own behalf. Then, a vote is taken and he/she may be removed by a 2/3&apos;s vote of the Executive board.
            </p>

            <h5 className="section-heading">E. Voting Rights</h5>
            <p>
              Only Active USF students in the organization have voting rights. Non-USF students do not have voting rights.
            </p>
          </section>

          {/* Article IV */}
          <section className="constitution-article">
            <h3 className="article-title">Article IV</h3>
            <h4 className="article-subtitle">DUES/FEES</h4>
            <p>
              No local dues, fees, assessments, donations, or other charges are levied for membership.
            </p>
          </section>

          {/* Article V */}
          <section className="constitution-article">
            <h3 className="article-title">Article V</h3>
            <h4 className="article-subtitle">QUORUM</h4>
            <p>
              A quorum shall be composed of 50% + 1 of current, active voting members. Quorum must be present for any vote to take place on organization issues or amendments to this constitution.
            </p>
          </section>

          {/* Article VI */}
          <section className="constitution-article">
            <h3 className="article-title">Article VI</h3>
            <h4 className="article-subtitle">OFFICERS</h4>

            <h5 className="section-heading">A. Officer Positions</h5>
            <p>
              The required officer positions include: <strong>President</strong>, <strong>Vice President</strong>, and <strong>Treasurer</strong>. These officers are elected to serve a one (1) academic school year term. These positions are included in the Executive Board. Optional officer positions may be created by a majority vote of the Executive Board to serve the organization. Optional officers are elected to serve a one (1) academic school year term. The duties and titles of these offices will be created and established in the organizational bylaws. Only current USF student members can hold office.
            </p>

            <h5 className="section-heading">B. Main Officers&apos; Duties</h5>
            <p>
              An Executive Board comprised of Officers will govern the activities of the organization, and the specific duties of the required Officers will be as follows:
            </p>
            <ol className="constitution-numbered-list">
              <li><strong>President:</strong> shall preside over meetings; oversee organizational functions; act as a primary University liaison; and conduct decisions as established in the organizational bylaw.</li>
              <li><strong>Vice President:</strong> shall assist the President with their duties and preside over the organization in the President&apos;s absence.</li>
              <li><strong>Treasurer:</strong> shall receive, dispatch, and keep accurate records of all financial matters regarding the organization. Furthermore, the Treasurer shall submit the organization&apos;s annual/interim budget forms, purchase orders, or related to Student Government or E-Council for A&amp;S financial allocation and IEEE-FWCS or IEEE-CS for additional financial allocation from the main affiliated organization.</li>
              <li><strong>Secretary (Optional):</strong> shall keep a record of all correspondences, meetings, club&apos;s bylaws, activities, and other organizational documents; inform officers of deadlines for reports, mailings, and future commitments; maintain a roster of officers and members with their current contact information; submit or manage event attendance report in both BullsConnect and IEEE vTools. Works closely with Event Chair, Webmaster, Social Media Chair, Graphic Design Chair, Collaboration/Outreach Chair, and TC Chairs.</li>
              <li><strong>Event Chair (Optional):</strong> shall collaborate with other officers to create and execute exciting, interesting events for the club members; oversee, coordinate, and collect reports about all events organized by the TC Chairs, Logistics Chair, Collaboration/Outreach Chair, or other officers.</li>
              <li><strong>Webmaster (Optional):</strong> shall develop and maintain club website and social media sites; find ways to use technology to improve the organization&apos;s operations.</li>
              <li><strong>Social Media Chair (Optional):</strong> shall manage all the club social media and posting platforms.</li>
              <li><strong>Graphic Design Chair (Optional):</strong> shall create all the club&apos;s digital graphic designs as necessary, such as flyers and artworks for promotional items.</li>
              <li><strong>Collaboration/Outreach Chair (Optional):</strong> shall find and contact companies, industries, organizations, and professional and academic experts in CSE-related topics for collaboration.</li>
              <li><strong>Logistics Chair (Optional):</strong> shall manage and allocate all supplies or items purchased by the club or for any club&apos;s activities.</li>
            </ol>

            <h5 className="section-heading">C. E-Board Eligibility</h5>
            <p>
              All USF students who are registered members of the organization must be allowed to run for an E-Board/Officer position regardless of college/major.
            </p>

            <h5 className="section-heading">D. Technical Committees (TCs)</h5>
            <p>
              Technical committees (TCs) may be created as necessary by the President or majority vote from the Executive Board for specific events and projects not to last longer than the current officer term. Each committee will have a chair, as appointed by the President. Any member or officer may be selected as a TC chair. Any number of members may be on a committee.
            </p>

            <h5 className="section-heading">E. Technical Committees (TC) Chairs</h5>
            <p>
              Technical committee (TC) Chairs are additional, optional officers (also members of the Executive Board) that will govern specific events and projects of the organization.
            </p>

            <h5 className="section-heading">F. List of Technical Committees</h5>
            <p>
              An effective list of TC shall be provided under Amendment A1, with respective descriptions.
            </p>
          </section>

          {/* Article VII */}
          <section className="constitution-article">
            <h3 className="article-title">Article VII</h3>
            <h4 className="article-subtitle">ELECTION OF OFFICERS</h4>
            <ol className="constitution-alpha-list">
              <li>The elections for officers for the forthcoming year will take place in April. Any student member may campaign or be nominated for any position on the Executive Board.</li>
              <li>At least one (1) officer shall be a student in the USF CSE Department. The other officers may be from any USF department or college.</li>
              <li>The President must notify members of the election timeline and nomination process at least two weeks prior to the election nomination deadline.</li>
              <li>Nominees shall be given time to present themselves during the election meeting. Members of the organization may ask candidates relevant questions to their position.</li>
              <li>Elections will be conducted by ballot. The candidate for each office receiving a majority vote of members present at the elections meeting will be considered the victor.</li>
              <li>New officers take office at the last meeting of the semester in which the transition takes place and remain in office until the next election&apos;s officer transition meeting.</li>
              <li>If a position remains unfilled after the elections process, the newly elected President will appoint a member to the position or re-assign duties to another officer.</li>
              <li>In the event that a required officer position becomes vacant, an election to fill that position will automatically occur.</li>
            </ol>
          </section>

          {/* Article VIII */}
          <section className="constitution-article">
            <h3 className="article-title">Article VIII</h3>
            <h4 className="article-subtitle">REMOVAL OF OFFICERS</h4>
            <ol className="constitution-alpha-list">
              <li>If an officer fails to maintain enrollment in the University, they shall resign and/or be removed from office immediately.</li>
              <li>If it is believed that an officer fails to uphold the purpose and objectives of the organization, to fulfill the duties of the office, to meet membership requirements, or comply with University policies, he or she may be removed from office.</li>
              <li>The Advisor, if appropriate, shall preside over the removal hearing. After all arguments have been heard, a secret-ballot vote shall be heard. If at least two-thirds of the voting members present vote for removal, the officer shall be removed immediately.</li>
              <li>Removed officer positions will be filled in accordance with Article VII, H.</li>
            </ol>
          </section>

          {/* Article IX */}
          <section className="constitution-article">
            <h3 className="article-title">Article IX</h3>
            <h4 className="article-subtitle">ADVISOR(S)</h4>
            <ol className="constitution-alpha-list">
              <li>A full-time USF faculty or staff member will serve as an advisor. A member from the USF CSE Department is preferred as the Advisor to better support the organization&apos;s purpose and goal, although this is not required.</li>
              <li>Nominations for Advisor will take place within the Executive Board. An Advisor will be chosen within two weeks of a vacancy.</li>
              <li>During the officers transition meeting, the organization will vote on whether to continue the Advisor appointment or not.</li>
              <li>The duties of the Advisor include: meeting with organization officers, reviewing the yearly budget, signing all required paperwork, and advising on issues of risk management, organization leadership, and USF policy.</li>
              <li>The Advisor can be removed for not carrying out the duties and expectations as defined in this document.</li>
              <li>If an Advisor steps down, is removed, or is not re-appointed, the Executive Board will follow the process stated in Article IX, B.</li>
            </ol>
          </section>

          {/* Article X */}
          <section className="constitution-article">
            <h3 className="article-title">Article X</h3>
            <h4 className="article-subtitle">MEETINGS</h4>
            <ol className="constitution-alpha-list">
              <li>The President and Executive Board shall determine the time and place of General meetings by majority vote. The Executive Board shall determine the frequency, time, and place to meet for Executive Board meetings by majority vote.</li>
              <li>Special meetings may be called upon by any Executive Board member and require at least 48-hour notice to all members.</li>
              <li>The officer transitions meeting will be held within 2 weeks following the election of new officers.</li>
            </ol>
          </section>

          {/* Article XI */}
          <section className="constitution-article">
            <h3 className="article-title">Article XI</h3>
            <h4 className="article-subtitle">RULES OF ORDER</h4>
            <p>
              Meetings shall be run according to <em>Robert&apos;s Rules of Order</em>. Robert&apos;s Rules of Order will be used in instances not covered in this constitution.
            </p>
          </section>

          {/* Article XII */}
          <section className="constitution-article">
            <h3 className="article-title">Article XII</h3>
            <h4 className="article-subtitle">AMENDMENTS</h4>
            <ol className="constitution-alpha-list">
              <li>Amendments must be submitted to, and are subject to review and approval by, the respective campus office responsible for student organizations for where the organization will primarily function.</li>
              <li>Written notification of the proposed amendment to all voting members must be made by mail or email, at least two weeks in advance of any vote on changes in the constitution.</li>
              <li>A two-thirds vote of members present will be required for adoption.</li>
              <li>Amendments are subject to the approval of the Center for Leadership and Civic Engagement.</li>
            </ol>
          </section>

          {/* Article XIII */}
          <section className="constitution-article">
            <h3 className="article-title">Article XIII</h3>
            <h4 className="article-subtitle">ANTI-HAZING CLAUSE</h4>
            <p className="italic">
              &quot;This organization prohibits its members, both individually and collectively from committing any acts of hazing as defined herein:&quot;
            </p>
            <p>
              &quot;Hazing&quot; as defined by §1006.63, Florida Statutes, means any action or situation that recklessly or intentionally endangers the mental or physical health or safety of a student for purposes including, but not limited to, initiation or admission into or affiliation with any organization operating under the sanction of a postsecondary institution, regardless of a person&apos;s willingness to participate.
            </p>
          </section>

          {/* Article XIV */}
          <section className="constitution-article">
            <h3 className="article-title">Article XIV</h3>
            <h4 className="article-subtitle">ORGANIZATION AGREEMENT</h4>
            <p>
              Organization agrees to comply with all university policies or procedures, as stated in the Student Handbook, Student Organization Handbook, and Code of Student Conduct, as well as any policies or procedures set forth by the respective campus&apos; office responsible for student organizations for where the organization will primarily function.
            </p>
          </section>

          {/* Article XV */}
          <section className="constitution-article">
            <h3 className="article-title">Article XV</h3>
            <h4 className="article-subtitle">POLICY COMPLIANCE STATEMENT</h4>
            <ol className="constitution-alpha-list">
              <li>Each registered student organization&apos;s purposes and activities shall comply with applicable provisions of the United States Constitution, federal laws, the Constitution of the State of Florida, state laws, rules and regulations of the Board of Governors, the University of South Florida Board of Trustees, University of South Florida, and the University of South Florida Student Conduct Code.</li>
              <li>The student organization and its officers are responsible and accountable for all actions of the organization.</li>
              <li>Any violation of law, Board of Governors&apos; rules and regulations, University of South Florida Board of Trustees rules and regulations, or University of South Florida rules shall be considered as offenses committed by the organization.</li>
              <li>Any violation by a student organization shall render the organization&apos;s registration subject to review and possible revocation.</li>
            </ol>
          </section>

          {/* Article XVI */}
          <section className="constitution-article">
            <h3 className="article-title">Article XVI</h3>
            <h4 className="article-subtitle">ACTIVITY AND SERVICE FEE AGREEMENT</h4>
            <p>
              If this organization applies for funding through the Student Government Activity and Service funding process, this organization agrees to abide by all Student Government policies.
            </p>
          </section>

          {/* Decorative divider before amendments */}
          <div className="amendment-divider">
            <span className="divider-ornament">❧</span>
          </div>

          {/* Amendments */}
          <section className="constitution-article amendment-section">
            <h3 className="amendment-title">AMENDMENTS A1</h3>
            <h4 className="amendment-subtitle">
              List of Technical Committees for the<br />
              Institute of Electrical and Electronics Engineers – Computer Society<br />
              Student Branch Chapter at the University of South Florida
            </h4>

            <h5 className="article-title mt-8">Article A1-I</h5>
            <h6 className="article-subtitle">INTRODUCTION</h6>
            <p>
              This amendment provides the list of technical committees (TC) effective for the 2023-2024 academic year. This amendment shall be reviewed, updated, and approved for every academic year as established in the organizational bylaw.
            </p>

            <h5 className="article-title mt-8">Article A1-II</h5>
            <h6 className="article-subtitle">LIST OF TECHNICAL COMMITTEES</h6>
            <p>Following is the list of technical committees:</p>
            
            <ol className="tc-list">
              <li>
                <strong>TC – Hardwathon:</strong> the Hardwathon (i.e., Hardware Hackathon) is a series of practical events that provides students with training, tutorial, and hands-on challenges in hardware-related topics towards a competitive final activity with potential awards.
              </li>
              <li>
                <strong>TC – Demystifying Hardware:</strong> the Demystifying Hardware is a series of tech talks and workshops on computer hardware-related topics.
              </li>
              <li>
                <strong>TC – Demystifying Software:</strong> the Demystifying Software is a series of tech talks and workshops on software-related topics.
              </li>
              <li>
                <strong>TC – Professional Development:</strong> the Professional Development is a series of talks and workshops on professional development, career advice, resume/CV building, and interview preparation.
              </li>
              <li>
                <strong>TC – Mentorship:</strong> Project Mentorship is a series of workshops to allow students to share ideas and mentor them towards designing/building their projects.
              </li>
              <li>
                <strong>TC – Fundraising:</strong> shall identify potential fundraising opportunities and develop relationships with external organizations, companies, or individuals who may be interested in financially supporting the organization.
              </li>
              <li>
                <strong>TC – Tabling:</strong> shall be responsible for executing all tabling events, which serve as an opportunity for the organization to showcase its mission, goals, and activities to the broader campus community.
              </li>
            </ol>
          </section>

          {/* Footer seal */}
          <footer className="constitution-footer">
            <div className="seal">
              <div className="seal-inner">
                <span className="seal-text">IEEE–CS</span>
                <span className="seal-subtext">USF</span>
              </div>
            </div>
            <p className="footer-text">
              Enacted in accordance with the principles of academic excellence<br />
              and the advancement of computer science education.
            </p>
          </footer>
        </div>
      </article>
      </div>
      <div className="flex flex-col items-center mt-4">
        <h1 className='text-4xl font-bold text-ieeeDark mb-8'>Founding Fathers</h1>
        <Image 
          src={foundingFathers} 
          alt="IEEE-CS USF Founding Fathers" 
          className="max-w-4xl w-full h-auto rounded-lg shadow-lg"
        />
        <p className='mt-3'>Andrew Seely, Mateus A. Fernandes, Nybbles</p>
      </div>

    </main>
  )
}
