# <h1 align="center">Percolation Simulator</h1>

<p align="center">
  <img src="https://github.com/eliraybon/percolationSimulator/blob/master/public/assets/readme/sim.png">
</p>

This data-visualization application calculates the percolation threshold of a system by running repeated Monte Carlo simulations and averaging the results. These simulations are powered by a weigted-quick-union implementation of the UnionFind data structure, which efficiently checks if two sites in the system are connected or not. I'll get into what that all means later... But first, let's quickly go over the controls!

The visualizer is really simple to use. To start/stop the simulation, just click the play button or press the space bar. To continuously loop simulations, activate the cycle button. The trashcan resets the system, and the slider adjusts the simulation speed.

## UnionFind
Before we get into percolation, let's briefly discuss the data structure that allows us to efficiently run the simulations: UnionFind (in particular, the weighted quick-union implementation). It uses a tree-like structure to keep track of connections in a system. We say it's weighted because when you make a connection in the system, our algorithm garantees that the root of the smaller tree will always be connected to the root of the larger tree. This keeps the overall tree structure flattened, preserving an O(log(N)) runtime. If our N jumps from a million to a billion, we only have to do about 10 more operations! This efficiency is critical when running our percolation simulator on large inputs. I won't go into implementation details becuase UnionFind is another topic in and of itself, but here is a great slide that demonstrates the effect weighting has on the shape of our tree:

<p align="center">
  <img src="https://github.com/eliraybon/percolationSimulator/blob/master/public/assets/readme/weighted.png">
</p>

## Percolation

A percolation system can be used to model the flow of electricity through conductors and insulators, the flow of water through a porous substance, or even connectivity on a social network. We say the system "percolates" if a site in the top row is connected to a site in the bottom row.

<p align="center">
  <img 
     height="333px" 
     width="300px"
     src="https://github.com/eliraybon/percolationSimulator/blob/master/public/assets/readme/does_perc.png">
  <img 
     height="333px" 
     width="300px"
     src="https://github.com/eliraybon/percolationSimulator/blob/master/public/assets/readme/does_not_perc.png"
  >
</p>

The first system above percolates because there is a path from the top to the bottom. The second does not. 

We are interseted in calculating the percolation threshold, which is the average number of sites that need to be open for a system to percolate. We are using Monto Carlo simulation for these experiments, which relies on repeated random sampling to obtain a numerical result. By running millions of simulations at a large N, we can accurately zone in on the threshold. There are 2 really interesting things about this:

1) There is no mathematical solution to this problem (at least not yet!). The only solution we have relies on a computational model where we run simulations to calculate the threshold. These simulations would not be feasable at a large N without effiecient UnionFind algorithms.

2) When the number of open sites is below the threshold, the system will almost certainly NOT percolate. When the number of open sites is above the threshold, it almost certainly will. You can see this phase transition pictured in the graph below:

<p align="center">
  <img src="https://github.com/eliraybon/percolationSimulator/blob/master/public/assets/readme/threshold.png">
</p>

Our percolation system is made up of an N x N grid of "sites". We also add two extra "virtual sites" called the "source" and the "sink". The source is connected to every site in the top row, and the sink is connected to every site in the bottom row. This way, we just need to check if the source is connected to the sink, and we'll know if the system percolates.

<p align="center">
  <img src="https://github.com/eliraybon/percolationSimulator/blob/master/public/assets/readme/sourceandsink.png">
</p>


Sites can be in one of three states: closed, open, or full. Open and closed sites are self-explanatory, but a full site is an open site that is connected to the source, our virtual top site. This state determines their color in the visualizer: closed is dark gray, open is light gray, and blue is full. 

The simulation starts with all sites closed. They are randomly opened until the system percolates. From there, we can calculate the percolation threshold by dividing the number of open sites by the total number of sites. When repeated millions of times, we can zero in on an accurate value of the threshold. This visaulizer is meant to give you a feel for what a few iterations of that process looks like. 
