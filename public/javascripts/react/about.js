import React from 'react';

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    	<div className="about">
    		<h1>About Me</h1>
    		<img src="/images/mekayak.jpg" />

        <h3>Hi, my name is Dean.</h3>
    		<p>
          That's me in the midst of that whitewater!  I flipped shortly after, but did manage to roll
          back up and keep paddling.  Fun stuff.
    		</p>
    		<p>
    			I'm a software engineer by profession.  I am a geek by hobby. I spend large sums of time
    			playing with new programming languages and learning about writing good quality code. I do
    			have many other interest though... I play guitar, do <a href="/music">DJ Mix Sets</a>,
    			I love to go whitewater kayaking, I practice martial arts - specifically Muay Thai and
    			Brazillian Jiu Jitsu (although I've been slack on that lately) and I love mountain biking.
    		</p>
    		<p>
    			I have worked for an internet security company for 5 years doing C, Java, Groovy/Grails,
    			HTML and Javascript development.  However, I am currently in the process of switching jobs
    			and will be going to... another internet security company.  However, I will be doing
    			Python, Django and HTML5/Javascript development there.
    		</p>
    		<p>
    			I have been married for 3 years now and my wife and I do just about everything together
    			and we have been together for about 6 years now.  I live in a suburb of Atlanta, GA and
    			have a miniature poodle and a cat. About the only thing my wife and I don't do together
    			is mountain biking.  However, she has a bike and tries to do it with me every now and then.
    		</p>
    		<p>
    			I wrote this site in Python/Django. It used to be done with Ruby on Rails.  However, I
    			figured I would switch over since I was getting into Python.  I like Django a lot and
    			have enjoyed using it for this site.
    		</p>
    		<p>
    			The site will basically hold ramblings from me, code snippets, and host
          by <a href="/code">coding projects</a>, <a href="/music">random music</a> and
    			other things.  If you'd like, <a href="/contact">let me know what's up.</a>
    		</p>
    	</div>
    );
  }
}
export default About;
