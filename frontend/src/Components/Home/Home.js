// import React from "react";
// import { NavLink } from "react-router-dom";
// import "./Home.css";

// function Home() {
//   return (
//     <div className="home">
//       {/* Hero Section */}
//       <section className="hero">
//         <div className="hero-content">
//           <div className="hero-text">
//             <h1>
//               Transform Your Life with <span className="highlight">CorePlus</span>
//             </h1>
//             <p>
//               Join Sri Lanka's premier fitness community. Expert trainers, 
//               world-class equipment, and personalized programs to help you 
//               achieve your fitness goals.
//             </p>
//             <div className="hero-buttons">
//               <NavLink to="/register" className="btn-primary">
//                 Start Your Journey
//               </NavLink>
//               <NavLink to="/features" className="btn-secondary">
//                 Explore Programs
//               </NavLink>
//               <NavLink to="/bmi" className="btn-tertiary">
//                 BMI Calculator
//               </NavLink>
//             </div>
//             <div className="hero-stats">
//               <div className="stat">
//                 <h3>5000+</h3>
//                 <p>Active Members</p>
//               </div>
//               <div className="stat">
//                 <h3>50+</h3>
//                 <p>Expert Trainers</p>
//               </div>
//               <div className="stat">
//                 <h3>15+</h3>
//                 <p>Years Experience</p>
//               </div>
//             </div>
//           </div>
//           <div className="hero-image">
//             <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="Modern Gym Interior" />
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="features">
//         <div className="container">
//           <h2>Why Choose CorePlus?</h2>
//           <div className="features-grid">
//             <div className="feature-card">
//               <div className="feature-icon">
//                 <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" alt="Personal Training" />
//               </div>
//               <h3>Personal Training</h3>
//               <p>One-on-one sessions with certified trainers to help you reach your specific fitness goals.</p>
//             </div>
//             <div className="feature-card">
//               <div className="feature-icon">
//                 <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" alt="Group Classes" />
//               </div>
//               <h3>Group Classes</h3>
//               <p>High-energy group workouts including yoga, pilates, HIIT, and strength training classes.</p>
//             </div>
//             <div className="feature-card">
//               <div className="feature-icon">
//                 <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" alt="Nutrition Guidance" />
//               </div>
//               <h3>Nutrition Guidance</h3>
//               <p>Expert nutrition advice and meal planning to complement your fitness routine.</p>
//             </div>
//             <div className="feature-card">
//               <div className="feature-icon">
//                 <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" alt="Modern Equipment" />
//               </div>
//               <h3>Modern Equipment</h3>
//               <p>State-of-the-art fitness equipment and facilities for all your training needs.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Programs Section */}
//       <section className="programs">
//         <div className="container">
//           <h2>Our Programs</h2>
//           <div className="programs-grid">
//             <div className="program-card">
//               <img src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Weight Training" />
//               <div className="program-content">
//                 <h3>Weight Training</h3>
//                 <p>Build strength and muscle with our comprehensive weight training programs.</p>
//                 <NavLink to="/features" className="program-btn">Learn More</NavLink>
//               </div>
//             </div>
//             <div className="program-card">
//               <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Cardio Fitness" />
//               <div className="program-content">
//                 <h3>Cardio Fitness</h3>
//                 <p>Improve your cardiovascular health with our dynamic cardio programs.</p>
//                 <NavLink to="/features" className="program-btn">Learn More</NavLink>
//               </div>
//             </div>
//             <div className="program-card">
//               <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Yoga & Flexibility" />
//               <div className="program-content">
//                 <h3>Yoga & Flexibility</h3>
//                 <p>Enhance flexibility and mindfulness with our yoga and stretching classes.</p>
//                 <NavLink to="/features" className="program-btn">Learn More</NavLink>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Store Section */}
//       <section className="store-preview">
//         <div className="container">
//           <div className="store-content">
//             <div className="store-text">
//               <h2>Premium Supplements & Equipment</h2>
//               <p>
//                 Shop our carefully curated selection of supplements, protein powders, 
//                 and fitness equipment to support your training journey.
//               </p>
//               <NavLink to="/showItems" className="btn-primary">Shop Now</NavLink>
//             </div>
//             <div className="store-image">
//               <img src="https://fitnessisland.lk/cdn/shop/files/fitness_warehouse_pre_advanced_group_grande_e9173620-3bdc-4c11-9ed7-b31547bf393e.webp?v=1749362041" alt="Supplements Store" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="testimonials">
//         <div className="container">
//           <h2>What Our Members Say</h2>
//           <div className="testimonials-grid">
//             <div className="testimonial-card">
//               <div className="testimonial-content">
//                 <p>"CorePlus transformed my life. The trainers are amazing and the community is so supportive!"</p>
//                 <div className="testimonial-author">
//                   <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" alt="Sarah Johnson" />
//                   <div>
//                     <h4>Sarah Johnson</h4>
//                     <span>Member for 2 years</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="testimonial-card">
//               <div className="testimonial-content">
//                 <p>"The best gym in Colombo! Great equipment, clean facilities, and excellent trainers."</p>
//                 <div className="testimonial-author">
//                   <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" alt="Michael Chen" />
//                   <div>
//                     <h4>Michael Chen</h4>
//                     <span>Member for 3 years</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="testimonial-card">
//               <div className="testimonial-content">
//                 <p>"I've achieved goals I never thought possible. The nutrition guidance was a game changer!"</p>
//                 <div className="testimonial-author">
//                   <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" alt="Priya Fernando" />
//                   <div>
//                     <h4>Priya Fernando</h4>
//                     <span>Member for 1 year</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="cta">
//         <div className="container">
//           <div className="cta-content">
//             <h2>Ready to Start Your Fitness Journey?</h2>
//             <p>Join thousands of members who have transformed their lives with CorePlus</p>
//             <div className="cta-buttons">
//               <NavLink to="/register" className="btn-primary">Join Now</NavLink>
//               <NavLink to="/login" className="btn-secondary">Member Login</NavLink>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;



import React from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Transform Your Life with <span className="highlight">CorePlus</span>
            </h1>
            <p>
              Join Sri Lanka's premier fitness community. Expert trainers,
              world-class equipment, and personalized programs to help you
              achieve your fitness goals.
            </p>

            {/* ✅ Hero Buttons Section */}
            <div className="hero-buttons">
              <NavLink to="/register" className="btn-primary">
                Start Your Journey
              </NavLink>
              <NavLink to="/features" className="btn-secondary">
                Explore Programs
              </NavLink>
              <NavLink to="/bmi" className="btn-tertiary">
                BMI Calculator
              </NavLink>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              <div className="stat">
                <h3>5000+</h3>
                <p>Active Members</p>
              </div>
              <div className="stat">
                <h3>50+</h3>
                <p>Expert Trainers</p>
              </div>
              <div className="stat">
                <h3>15+</h3>
                <p>Years Experience</p>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Modern Gym Interior"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose CorePlus?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80"
                  alt="Personal Training"
                />
              </div>
              <h3>Personal Training</h3>
              <p>
                One-on-one sessions with certified trainers to help you reach
                your specific fitness goals.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <img
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80"
                  alt="Group Classes"
                />
              </div>
              <h3>Group Classes</h3>
              <p>
                High-energy group workouts including yoga, pilates, HIIT, and
                strength training classes.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <img
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80"
                  alt="Nutrition Guidance"
                />
              </div>
              <h3>Nutrition Guidance</h3>
              <p>
                Expert nutrition advice and meal planning to complement your
                fitness routine.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <img
                  src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=400&q=80"
                  alt="Modern Equipment"
                />
              </div>
              <h3>Modern Equipment</h3>
              <p>
                State-of-the-art fitness equipment and facilities for all your
                training needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="programs">
        <div className="container">
          <h2>Our Programs</h2>
          <div className="programs-grid">
            <div className="program-card">
              <img
                src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=600&q=80"
                alt="Weight Training"
              />
              <div className="program-content">
                <h3>Weight Training</h3>
                <p>
                  Build strength and muscle with our comprehensive weight
                  training programs.
                </p>
                <NavLink to="/features" className="program-btn">
                  Learn More
                </NavLink>
              </div>
            </div>
            <div className="program-card">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80"
                alt="Cardio Fitness"
              />
              <div className="program-content">
                <h3>Cardio Fitness</h3>
                <p>
                  Improve your cardiovascular health with our dynamic cardio
                  programs.
                </p>
                <NavLink to="/features" className="program-btn">
                  Learn More
                </NavLink>
              </div>
            </div>
            <div className="program-card">
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80"
                alt="Yoga & Flexibility"
              />
              <div className="program-content">
                <h3>Yoga & Flexibility</h3>
                <p>
                  Enhance flexibility and mindfulness with our yoga and
                  stretching classes.
                </p>
                <NavLink to="/features" className="program-btn">
                  Learn More
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Store Section */}
      <section className="store-preview">
        <div className="container">
          <div className="store-content">
            <div className="store-text">
              <h2>Premium Supplements & Equipment</h2>
              <p>
                Shop our carefully curated selection of supplements, protein
                powders, and fitness equipment to support your training journey.
              </p>
              <NavLink to="/showItems" className="btn-primary">
                Shop Now
              </NavLink>
            </div>
            <div className="store-image">
              <img
                src="https://fitnessisland.lk/cdn/shop/files/fitness_warehouse_pre_advanced_group_grande_e9173620-3bdc-4c11-9ed7-b31547bf393e.webp?v=1749362041"
                alt="Supplements Store"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2>What Our Members Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "CorePlus transformed my life. The trainers are amazing and
                  the community is so supportive!"
                </p>
                <div className="testimonial-author">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=200&q=80"
                    alt="Sarah Johnson"
                  />
                  <div>
                    <h4>Sarah Johnson</h4>
                    <span>Member for 2 years</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "The best gym in Colombo! Great equipment, clean facilities,
                  and excellent trainers."
                </p>
                <div className="testimonial-author">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                    alt="Michael Chen"
                  />
                  <div>
                    <h4>Michael Chen</h4>
                    <span>Member for 3 years</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "I've achieved goals I never thought possible. The nutrition
                  guidance was a game changer!"
                </p>
                <div className="testimonial-author">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80"
                    alt="Priya Fernando"
                  />
                  <div>
                    <h4>Priya Fernando</h4>
                    <span>Member for 1 year</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ CTA Section with BMI Button */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Fitness Journey?</h2>
            <p>
              Join thousands of members who have transformed their lives with
              CorePlus
            </p>
            <div className="cta-buttons">
              <NavLink to="/register" className="btn-primary">
                Join Now
              </NavLink>
              <NavLink to="/login" className="btn-secondary">
                Member Login
              </NavLink>
              <NavLink to="/bmi" className="btn-tertiary">
                BMI Calculator
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
