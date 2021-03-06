import React from 'react';

const Music = (props) => {
  return (
  	<div className="music">
  		<h1>Music</h1>
  		<article>
  			<header>
  				<h3><a href="/media/download/music/Dean Jones - Voxy.mp3">Voxy</a></h3>
  				<div className="info">
  					A <strong>Vocal House/Progressive</strong> mix, done on
  					<time dateTime="2010-11-14"> Nov 14, 2010</time>
  				</div>
  			</header>
  			<p>
  				Another Ableton Live mix.  I was really into vocals and Kaskade at the time and
  				wanted to make a mix of all of my favorite Kaskade tracks for I could listen to
  				them in a nice mix fashion.  I also threw in some other favs at the end of it all
  				that aren't Kaskade related.
  			</p>
  		</article>
  		<article>
  			<header>
  				<h3><a href="/media/download/music/Dean Jones - Aeiou.mp3">AEIOU</a></h3>
  				<div className="info">
  					An <strong>Electro/Progressive</strong> mix, done on
  					<time dateTime="2009-08-24"> Aug 24, 2009</time>
  				</div>
  			</header>
  			<p>
  				This was my first Electro House type mix as well as my first mix using Ableton Live.
  				A lot of dirty beats in here but it eventually
  				transitions into a sort of progressive house type set.  I like it, personally.
  			</p>
  		</article>
  		<article>
  			<header>
  				<h3><a href="/media/download/music/Dean Jones - Redeux.mp3">Redeux</a></h3>
  				<div className="info">
  					A <strong>Progressive House</strong> mix, done on
  					<time dateTime="2005-05-15"> May 15, 2005</time>
  				</div>
  			</header>
  			<p>
  				A progressive house mix done using CDJ's.  I worked on this mix a lot and did it over
  				and over until I couldn't stand the music anymore.  I think I have personally listened to
  				this mix a handful of times since I couldn't stand the tracks anymore after I was done
  				mixing them.
  			</p>
  		</article>
  		<article>
  			<header>
  				<h3><a href="/media/download/music/Dean Jones - Toronto.mp3">Toronto</a></h3>
  				<div className="info">
  					A <strong>Progressive House</strong> mix, done on
  					<time dateTime="2005-03-01"> Mar 1, 2005</time>
  				</div>
  			</header>
  			<p>
  				A progressive house mix done on CDJ's as well. This was done while I was on a short
  				leave from work.  I was heading out to Toronto in 2 days, hence the name of the mix.
  			</p>
  		</article>
  		<article>
  			<header>
  				<h3><a href="/media/download/music/Dean Jones - Taboo.mp3">Taboo</a></h3>
  				<div className="info">
  					A <strong>Trance</strong> mix, done on
  					<time dateTime="2005-09-15"> Sep 15, 2004</time>
  				</div>
  			</header>
  			<p>
  				This mix was done using pure Vinyl and some Technics turntables. It's a trance mix and
  				it was done for my sister as she's a big Trance fan.  She was opening a tanning salon
  				called Taboo Tan and she wanted a mix she could play for her customers.
  			</p>
  		</article>
  	</div>
  );
};

export default Music;
